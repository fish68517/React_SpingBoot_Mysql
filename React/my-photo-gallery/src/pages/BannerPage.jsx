import React, { useState, useEffect } from 'react';
import { getImageUrl } from '../utils/imageUtils';
import { uploadImage, getAllBanners, createBanner, updateBanner, deleteBanner } from '../api/network';

const BannerManagementPage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false); // 是否在新增模式
  const [editingId, setEditingId] = useState(null); // 当前编辑的 banner id

  // 表单状态（新增和编辑共用）
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(1);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  // 加载所有轮播图
  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const data = await getAllBanners();
      // 按排序值升序排列
      setBanners(data.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      alert('加载轮播图失败: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 处理图片选择
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!selected.type.startsWith('image/')) return alert('请选择图片');
    if (selected.size > 10 * 1024 * 1024) return alert('图片不能超过10MB');

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  // 开始新增
  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    setTitle('');
    setContent('');
    setSortOrder(banners.length > 0 ? Math.max(...banners.map(b => b.sortOrder)) + 1 : 0);
    setStatus(1);
    setFile(null);
    setPreviewUrl('');
  };

  // 开始编辑
  const startEdit = (banner) => {
    setEditingId(banner.id);
    setIsAdding(false);
    setTitle(banner.title || '');
    setContent(banner.content || '');
    setSortOrder(banner.sortOrder);
    setStatus(banner.status);
    setFile(null);
    setPreviewUrl(`/images/${banner.imageUrl}`); // 显示已有图片
  };

  // 取消操作
  const cancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFile(null);
    setPreviewUrl('');
  };

  // 提交（新增或更新）
  const handleSubmit = async () => {
    if (!title.trim()) return alert('请输入标题');
    if (!file && !editingId) return alert('请选择图片'); // 新增必须上传图片

    setUploading(true);
    try {
      let imageUrl = editingId ? banners.find(b => b.id === editingId).imageUrl : null;

      // 如果选择了新图片，则上传
      if (file) {
        imageUrl = await uploadImage(file); // 复用你已有的上传函数，返回文件名
      }

      const bannerData = {
        title: title.trim(),
        content: content.trim(),
        imageUrl,
        status,
        sortOrder: Number(sortOrder),
      };

      if (isAdding) {
        await createBanner(bannerData);
        alert('新增轮播图成功');
      } else {
        await updateBanner(editingId, bannerData);
        alert('更新成功');
      }

      cancel();
      loadBanners(); // 刷新列表
    } catch (err) {
      alert('操作失败: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  // 删除
  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这张轮播图吗？')) return;
    try {
      await deleteBanner(id);
      alert('删除成功');
      loadBanners();
    } catch (err) {
      alert('删除失败: ' + err.message);
    }
  };

  // 切换状态
  const toggleStatus = async (id, currentStatus) => {
    try {
      await updateBanner(id, { status: currentStatus === 1 ? 0 : 1 });
      loadBanners();
    } catch (err) {
      alert('操作失败');
    }
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-10 text-white">轮播图管理</h2>

      <div className="mb-6 text-right">
        <button
          onClick={startAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          + 新增轮播图
        </button>
      </div>

      {/* 新增/编辑表单 */}
      {(isAdding || editingId) && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            {isAdding ? '新增轮播图' : '编辑轮播图'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 图片上传区 */}
            <div>
              <label className="block text-gray-300 font-bold mb-2">轮播图片 {editingId && '(不改可留空)'}</label>
              {previewUrl && (
                <img src={previewUrl} alt="预览" className="w-full max-h-80 object-contain rounded-lg bg-black mb-4" />
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-gray-300" />
            </div>

            {/* 表单字段 */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-bold mb-1">标题</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-900 text-white rounded-lg p-3 border border-gray-700"
                  placeholder="轮播图标题"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-1">描述内容</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-gray-900 text-white rounded-lg p-3 border border-gray-700 h-24 resize-none"
                  placeholder="可选描述"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div
                 style={{ display: false ? 'block' : 'none' }}>
                  <label className="block text-gray-300 font-bold mb-1">排序值（数字越小越靠前）</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full bg-gray-900 text-white rounded-lg p-3 border border-gray-700"
                  />
                </div>

                <div 
                  style={{ display: false ? 'block' : 'none' }}>
                  <label className="block text-gray-300 font-bold mb-1">状态</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(Number(e.target.value))}
                    className="w-full bg-gray-900 text-white rounded-lg p-3 border border-gray-700"
                  >
                    <option value={1}>启用</option>
                    <option value={0}>禁用</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button onClick={cancel} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
              取消
            </button>
            <button
              onClick={handleSubmit}
              disabled={uploading}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
            >
              {uploading ? '提交中...' : '提交'}
            </button>
          </div>
        </div>
      )}

      {/* 轮播图列表 */}
      {loading ? (
        <p className="text-center text-gray-400">加载中...</p>
      ) : banners.length === 0 ? (
        <p className="text-center text-gray-400">暂无轮播图，点击上方按钮新增</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={getImageUrl(banner.imageUrl)}
                alt={banner.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-white font-bold truncate">{banner.title || '未命名'}</h4>
                <p className="text-gray-400 text-sm mt-1">{banner.content || '无描述'}</p>
                <div className="mt-3 flex items-center justify-between" style={{ display: false ? 'block' : 'none' }}>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    banner.status === 1 ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                  }`}>
                    {banner.status === 1 ? '启用' : '禁用'}
                  </span>
                  <span className="text-gray-500 text-xs">排序: {banner.sortOrder}</span>
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                  style={{ display: false ? 'block' : 'none' }}
                    onClick={() => toggleStatus(banner.id, banner.status)}
                    className="text-sm px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded"
                  >
                    {banner.status === 1 ? '禁用' : '启用'}
                  </button>
                  <button
                    onClick={() => startEdit(banner)}
                    className="text-sm px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    编辑
                  </button>
                  <button
                    onClick={() => handleDelete(banner.id)}
                    className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerManagementPage;