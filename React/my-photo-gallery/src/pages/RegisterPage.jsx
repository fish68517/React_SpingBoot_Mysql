import React from 'react';
// import { Link } from 'react-router-dom'; // 如果没用到可以暂时注释
import { loginUser,registerUser } from '../api/network';

const RegisterPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const data = await registerUser({ username, password });
      alert(`注册成功, 欢迎 ${username}!`);
      // 回到登录页面
      window.location.href = '/login';
     
    } catch (error) {
      alert(`注册失败: ${error.message}`);
    }
  };

  return (
    // 1. 最外层容器：占满全屏 (min-h-screen)、深色背景 (bg-gray-900)、Flex 居中
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      
      {/* 2. 内容限制容器：限制最大宽度，确保在手机和电脑上都好看 */}
      <div className="w-full max-w-sm">
        
        {/* 标题：增加 text-white 确保在深色背景下可见 */}
        <h2 className="text-4xl font-bold text-center mb-8 text-white">用户注册</h2>
        
        {/* 表单：保持原有的深色卡片样式 (bg-gray-800)，形成层次感 */}
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
            注册
          </button>
        </form>

      </div>
    </div>
  );
};

export default RegisterPage;