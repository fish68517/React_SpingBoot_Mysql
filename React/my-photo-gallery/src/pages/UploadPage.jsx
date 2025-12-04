import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImage, publishArtwork } from '../api/network';
import { getImageUrl } from '../utils/imageUtils'; // 引入你写好的工具类

const UploadPage = () => {
    const navigate = useNavigate();

    // 表单状态
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    
    // 提交状态
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. 处理文件选择 (实现本地预览)
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // 简单的验证
        if (!selectedFile.type.startsWith('image/')) {
            alert('请选择图片文件');
            return;
        }
        if (selectedFile.size > 5 * 1024 * 1024) { // 5MB 限制
            alert('图片大小不能超过 5MB');
            return;
        }

        setFile(selectedFile);
        // 生成本地预览 URL，让用户能立即看到图片
        setPreviewUrl(URL.createObjectURL(selectedFile));
    };

    // 2. 处理表单提交
    const handleSubmit = async () => {
        if (!file) {
            alert('请先选择一张照片');
            return;
        }
        if (!title.trim()) {
            alert('请输入作品标题');
            return;
        }

        setIsSubmitting(true);

        try {
            // 第一步：上传图片文件
            // uploadImage 函数会调用后端 /api/upload 接口
            const uploadedFileName = await uploadImage(file);
            console.log("图片上传成功，文件名:", uploadedFileName);

            // 获取 userInfo 从 localStorage
            const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
            const authorId = userInfo.id;

            // 第二步：提交作品信息
            const artworkData = {
                title,
                description,
                // 组合成后端需要的格式，这里我们只存文件名，或者存完整路径，取决于你的数据库设计
                // 假设后端 upload 接口返回的是 "xxx.jpg"，我们存入数据库
                imageUrl: uploadedFileName, 
                userId: authorId,
                status: 1,
                tags,
                width: 0, // 如果后端没自动获取，这里可以传0或前端读取
                height: 0
            };

            await publishArtwork(artworkData);
            
            alert('发布成功！作品已提交审核。');
            navigate('/home'); // 跳转回首页
        } catch (error) {
            console.error(error);
            alert('发布失败: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto max-w-2xl px-4">
            <h2 className="text-4xl font-bold text-center mb-8 text-white">上传你的作品</h2>
            
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
                {/* 图片上传区域 */}
                <div className="mb-6">
                    <label className="block text-gray-300 text-sm font-bold mb-2">
                        作品预览
                    </label>
                    
                    <div className="relative group">
                        {/* 如果有预览图，显示预览图；否则显示上传框 */}
                        {previewUrl ? (
                            <div className="relative rounded-lg overflow-hidden border-2 border-gray-600">
                                <img 
                                    src={previewUrl} 
                                    alt="Preview" 
                                    className="w-full h-auto max-h-[400px] object-contain bg-black" 
                                />
                                {/* 重新选择按钮 */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    <label htmlFor="photo-upload-change" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        更换图片
                                    </label>
                                    <input 
                                        type="file" 
                                        id="photo-upload-change" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handleFileChange} 
                                    />
                                </div>
                            </div>
                        ) : (
                            <label className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-700 transition flex flex-col items-center justify-center h-64">
                                <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                <p className="text-gray-400 text-lg">点击选择图片 或 拖拽至此</p>
                                <p className="text-gray-500 text-sm mt-2">支持 JPG, PNG (最大 5MB)</p>
                                <input 
                                    type="file" 
                                    id="photo-upload" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={handleFileChange} 
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* 标题输入 */}
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                        作品标题 <span className="text-red-500">*</span>
                    </label>
                    <input 
                        className="w-full bg-gray-900 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700" 
                        id="title" 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="给作品起个好名字" 
                    />
                </div>

                {/* 标签输入 */}
                <div className="mb-4">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="tags">
                        标签 (用逗号分隔)
                    </label>
                    <input 
                        className="w-full bg-gray-900 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700" 
                        id="tags" 
                        type="text" 
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="例如: 风光, 夜景, 人像" 
                    />
                </div>

                {/* 描述输入 */}
                <div className="mb-8">
                    <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
                        创作思路 / 描述
                    </label>
                    <textarea 
                        className="w-full bg-gray-900 text-white rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 resize-none" 
                        id="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="分享你拍摄这张照片时的想法、参数或故事..."
                    ></textarea>
                </div>

                {/* 提交按钮 */}
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full font-bold py-3 px-4 rounded-lg transition text-lg flex items-center justify-center ${
                        isSubmitting 
                            ? 'bg-blue-800 text-gray-300 cursor-not-allowed' 
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            正在上传...
                        </>
                    ) : (
                        '发布作品'
                    )}
                </button>
            </div>
        </div>
    );
};

export default UploadPage;