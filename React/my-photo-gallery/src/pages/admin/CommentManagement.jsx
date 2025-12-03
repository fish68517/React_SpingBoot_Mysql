import React, { useState, useEffect } from 'react';
import { getAllComments, deleteComment } from '../../api/network';

// 查看详情弹窗
const ViewCommentModal = ({ isOpen, onClose, comment }) => {
    if (!isOpen || !comment) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg max-w-lg w-full shadow-2xl border border-gray-700 p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                    <h3 className="text-xl font-bold text-white">评论详情</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 mb-4">
                        <img src={comment.avatar} alt="avatar" className="w-10 h-10 rounded-full"/>
                        <div>
                            <p className="font-bold text-white">{comment.user}</p>
                            <p className="text-xs text-gray-500">{comment.createdAt}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase">评论内容</label>
                        <div className="bg-gray-900 p-4 rounded-lg mt-1 text-gray-300">
                            {comment.content}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">来源</label>
                            <p className="text-blue-400 mt-1">
                                <span className="text-gray-400 text-xs mr-2">[{comment.targetType}]</span>
                                {comment.target}
                            </p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase">状态</label>
                            <p className="mt-1">
                                {comment.status === 'Reported' ? (
                                    <span className="text-red-400 font-bold">⚠️ 被举报</span>
                                ) : (
                                    <span className="text-green-400">正常</span>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        关闭
                    </button>
                </div>
            </div>
        </div>
    );
};

const CommentManagement = () => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    // 加载数据
    const loadComments = async () => {
        setIsLoading(true);
        try {
            const data = await getAllComments();
            setComments(data);
        } catch (error) {
            console.error("加载评论失败", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadComments();
    }, []);

    // 删除逻辑
    const handleDelete = async (id) => {
        if (window.confirm("确定要删除这条评论吗？此操作不可恢复。")) {
            try {
                await deleteComment(id);
                setComments(prev => prev.filter(c => c.id !== id));
                // 如果当前正在查看这条评论，则关闭弹窗
                if (selectedComment && selectedComment.id === id) {
                    setSelectedComment(null);
                }
            } catch (error) {
                alert("删除失败");
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-6">评论管理</h1>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-100 uppercase text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-3">用户</th>
                                <th className="px-6 py-3 w-1/3">内容摘要</th>
                                <th className="px-6 py-3">来源</th>
                                <th className="px-6 py-3">时间</th>
                                <th className="px-6 py-3">状态</th>
                                <th className="px-6 py-3 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {isLoading ? (
                                <tr><td colSpan="6" className="text-center py-8">加载中...</td></tr>
                            ) : comments.length === 0 ? (
                                <tr><td colSpan="6" className="text-center py-8">暂无评论</td></tr>
                            ) : (
                                comments.map(comment => (
                                    <tr key={comment.id} className="hover:bg-gray-750 transition-colors">
                                        <td className="px-6 py-4 font-medium text-white">
                                            {comment.user}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="truncate max-w-xs" title={comment.content}>
                                                {comment.content}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <span className="text-gray-500 mr-1">[{comment.targetType}]</span>
                                            {comment.target}
                                        </td>
                                        <td className="px-6 py-4 text-sm">{comment.createdAt}</td>
                                        <td className="px-6 py-4">
                                            {comment.status === 'Reported' ? (
                                                <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded">被举报</span>
                                            ) : (
                                                <span className="bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded">正常</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button 
                                                onClick={() => setSelectedComment(comment)}
                                                className="text-blue-400 hover:text-blue-300 transition"
                                            >
                                                查看
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(comment.id)}
                                                className="text-red-400 hover:text-red-300 transition"
                                            >
                                                删除
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ViewCommentModal 
                isOpen={!!selectedComment}
                onClose={() => setSelectedComment(null)}
                comment={selectedComment}
            />
        </div>
    );
};

export default CommentManagement;