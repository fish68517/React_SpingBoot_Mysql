import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../api/network';

// 简单的模态框组件 (用于新增/编辑)
const UserModal = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        username: '',
        nickname: '',
        email: '',
        role: 'USER',
        status: 'Active'
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({ username: '', nickname: '', email: '', role: 'USER', status: 'Active' });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4 text-white">
                    {initialData ? '编辑用户' : '新增用户'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">用户名</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={e => setFormData({...formData, username: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                            disabled={!!initialData} // 编辑时不允许改用户名
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">昵称</label>
                        <input
                            type="text"
                            value={formData.nickname}
                            onChange={e => setFormData({...formData, nickname: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-1 text-sm">邮箱</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-gray-400 mb-1 text-sm">角色</label>
                            <select
                                value={formData.role}
                                onChange={e => setFormData({...formData, role: e.target.value})}
                                className="w-full bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="USER">普通用户</option>
                                <option value="ADMIN">管理员</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-400 mb-1 text-sm">状态</label>
                            <select
                                value={formData.status}
                                onChange={e => setFormData({...formData, status: e.target.value})}
                                className="w-full bg-gray-700 text-white rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="Active">正常</option>
                                <option value="Banned">封禁</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition"
                        >
                            取消
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                        >
                            保存
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// 主页面组件
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    // 模态框状态
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null); // null 表示新增，否则为编辑

    // 加载用户数据
    const loadUsers = async () => {
        setIsLoading(true);
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error("加载用户失败:", error);
            // alert("加载失败");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // 处理新增/保存
    const handleSaveUser = async (formData) => {
        try {
            if (currentUser) {
                // 编辑模式
                await updateUser(currentUser.id, formData);
                setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...formData } : u));
                alert("用户更新成功");
            } else {
                // 新增模式
                const newUser = await createUser(formData);
                setUsers([...users, newUser]);
                alert("用户创建成功");
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("保存失败:", error);
            alert("保存失败");
        }
    };

    // 处理删除
    const handleDeleteUser = async (userId) => {
        if (window.confirm("确定要删除该用户吗？此操作不可恢复。")) {
            try {
                await deleteUser(userId);
                setUsers(users.filter(u => u.id !== userId));
            } catch (error) {
                console.error("删除失败:", error);
                alert("删除失败");
            }
        }
    };

    // 打开编辑框
    const openEditModal = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    // 打开新增框
    const openCreateModal = () => {
        setCurrentUser(null);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">用户管理</h1>
                <button
                    onClick={openCreateModal}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition"
                >
                    <span className="mr-2 text-xl">+</span> 新增用户
                </button>
            </div>

            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-300">
                        <thead className="bg-gray-700 text-gray-100 uppercase text-sm font-semibold">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">用户名</th>
                                <th className="px-6 py-3">昵称</th>
                                <th className="px-6 py-3">角色</th>
                                <th className="px-6 py-3">邮箱</th>
                                <th className="px-6 py-3">状态</th>
                                <th className="px-6 py-3 text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {isLoading ? (
                                <tr><td colSpan="7" className="text-center py-8">加载中...</td></tr>
                            ) : users.length === 0 ? (
                                <tr><td colSpan="7" className="text-center py-8">暂无数据</td></tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-750 transition-colors">
                                        <td className="px-6 py-4">{user.id}</td>
                                        <td className="px-6 py-4 font-medium text-white">{user.username}</td>
                                        <td className="px-6 py-4">{user.nickname}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                                user.role === 'ADMIN' ? 'bg-purple-900 text-purple-200' : 'bg-gray-600 text-gray-200'
                                            }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{user.email || '-'}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                                user.status === 'Active' ? 'bg-green-500' : 'bg-red-500'
                                            }`}></span>
                                            {user.status === 'Active' ? '正常' : '封禁'}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-3">
                                            <button
                                                onClick={() => openEditModal(user)}
                                                className="text-blue-400 hover:text-blue-300 transition"
                                            >
                                                编辑
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
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

            {/* 弹窗组件 */}
            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSaveUser}
                initialData={currentUser}
            />
        </div>
    );
};

export default UserManagement;