import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/network';

const LoginPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const data = await loginUser({ username, password });
      alert(`注册成功, 欢迎 ${data.user.name}!`);
      // 下一步: 将 token 存储起来 (localStorage) 并更新全局状态
    } catch (error) {
      alert(`登录失败: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto max-w-sm mt-20">
      <h2 className="text-4xl font-bold text-center mb-8">用户注册</h2>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">用户名</label>
          <input className="w-full bg-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="username" type="text" placeholder="请输入用户名" required />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">密码</label>
          <input className="w-full bg-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" type="password" placeholder="请输入密码" required />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition text-lg">
          注册
        </button>
      </form>
    </div>
  );
};

export default LoginPage;