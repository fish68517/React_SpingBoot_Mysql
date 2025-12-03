import React, { useState, useEffect } from 'react';
import { getPendingArtworks, approveArtwork, rejectArtwork } from '../../api/network';

// 作品详情/审核弹窗
const AuditModal = ({ isOpen, onClose, artwork, onApprove, onReject }) => {
    if (!isOpen || !artwork) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]" onClick={e => e.stopPropagation()}>
                {/* 左侧：图片预览 */}
                <div className="md:w-2/3 bg-black flex items-center justify-center p-4">
                    <img 
                        src={artwork.imageUrl} 
                        alt={artwork.title} 
                        className="max-w-full max-h-[80vh] object-contain"
                    />
                </div>
                
                {/* 右侧：信息与操作 */}
                <div className="md:w-1/3 p-6 flex flex-col justify-between bg-gray-800 border-l border-gray-700">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-2">{artwork.title}</h2>
                        <div className="flex items-center mb-4">
                            <img src={artwork.authorAvatar || 'https://placehold.co/50'} alt="avatar" className="w-8 h-8 rounded-full mr-2"/>
                            <span className="text-gray-300">{artwork.authorName}</span>
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="text-sm font-bold text-gray-500 uppercase">描述</h4>
                            <p className="text-gray-300 text-sm mt-1">{artwork.description || '暂无描述'}</p>
                        </div>
                        
                        <div className="mb-4">
                            <h4 className="text-sm font-bold text-gray-500 uppercase">标签</h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {artwork.tags ? artwork.tags.split(',').map(tag => (
                                    <span key={tag} className="text-xs bg-gray-700 text-blue-300 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                )) : <span className="text-gray-500 text-xs">无标签</span>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h4 className="text-sm font-bold text-gray-500 uppercase">提交时间</h4>
                            <p className="text-gray-300 text-sm mt-1">{artwork.createdAt}</p>
                        </div>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <button 
                            onClick={() => onReject(artwork.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition"
                        >
                            驳回
                        </button>
                        <button 
                            onClick={() => onApprove(artwork.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition"
                        >
                            通过发布
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 主页面组件
const ArtworkApproval = () => {
    const [pendingArtworks, setPendingArtworks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    // 加载待审核数据
    const loadData = async () => {
        setIsLoading(true);
        try {
            const data = await getPendingArtworks();
            setPendingArtworks(data);
        } catch (error) {
            console.error("加载待审核作品失败:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // 处理通过
    const handleApprove = async (id) => {
        try {

            console.log("handleApprove 开始操作:");
            const response = await approveArtwork(id);
   
            // 从列表中移除
            setPendingArtworks(prev => prev.filter(item => item.id !== id));
            setSelectedArtwork(null); // 关闭弹窗
            alert("已通过审核！");
        } catch (error) {
            console.error("handleApprove 操作失败:", error);
            alert("操作失败");
        }
    };

    // 处理驳回
    const handleReject = async (id) => {
        if(window.confirm("确定要驳回该作品吗？")) {
            try {
                await rejectArtwork(id);
                setPendingArtworks(prev => prev.filter(item => item.id !== id));
                setSelectedArtwork(null);
                alert("已驳回！");
            } catch (error) {
                alert("操作失败");
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">作品审核</h1>
            
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-gray-400">加载中...</div>
                ) : pendingArtworks.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-xl text-gray-300">太棒了！所有作品都已处理完毕。</p>
                        <p className="text-gray-500 mt-2">暂无待审核作品</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                        {pendingArtworks.map(artwork => (
                            <div 
                                key={artwork.id} 
                                className="bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition group"
                                onClick={() => setSelectedArtwork(artwork)}
                            >
                                <div className="aspect-w-4 aspect-h-3 relative">
                                    <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-48 object-cover"/>
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition flex items-center justify-center">
                                        <span className="text-white opacity-0 group-hover:opacity-100 font-bold bg-black bg-opacity-50 px-3 py-1 rounded">审核</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-white truncate">{artwork.title}</h3>
                                    <p className="text-sm text-gray-400 mt-1">作者: {artwork.authorName}</p>
                                    <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                                        <span>{artwork.createdAt}</span>
                                        <span className="bg-yellow-900 text-yellow-300 px-2 py-0.5 rounded">待审核</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AuditModal 
                isOpen={!!selectedArtwork}
                onClose={() => setSelectedArtwork(null)}
                artwork={selectedArtwork}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </div>
    );
};

export default ArtworkApproval;