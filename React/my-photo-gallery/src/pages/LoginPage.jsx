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
      alert(`登录成功, 欢迎 ${username}!`);
      const token = data.token;
      localStorage.setItem('authToken', token);
      const userInfo = data.user;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      // 重定向到首页
      if (userInfo.role === 'ADMIN') {
        window.location.href = '/admin';
      } else{
        window.location.href = '/home';
      }
    
    } catch (error) {
      alert(`登录失败: ${error.message}`);
    }
  };

  return (
    // 1. 最外层：全屏高度 (min-h-screen)、深色背景 (bg-gray-900)、Flex 居中对齐
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      {/* 2. 内容包装器：限制最大宽度 */}
      <div className="w-full max-w-sm">
        
        {/* 标题：改为白色字体 */}
        <h2 className="text-4xl font-bold text-center mb-8 text-white">用户登录</h2>
        
        <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-2xl space-y-6 border border-gray-700">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="username">用户名</label>
            <input 
              className="w-full bg-gray-900 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 placeholder-gray-500" 
              id="username" 
              type="text" 
              placeholder="请输入用户名" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">密码</label>
            <input 
              className="w-full bg-gray-900 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 placeholder-gray-500" 
              id="password" 
              type="password" 
              placeholder="请输入密码" 
              required 
            />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 text-lg shadow-md">
            登录
          </button>
          
          <p className="text-center text-gray-400 mt-4">
            还没有账户? <Link to="/register" className="text-blue-400 hover:text-blue-300 hover:underline transition">立即注册</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;