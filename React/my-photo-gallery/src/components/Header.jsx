import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const Header = () => (
  <header className="bg-gray-900 bg-opacity-80 backdrop-blur-sm text-white p-4 fixed top-0 left-0 right-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <CameraIcon />
        <h1 className="text-xl font-bold">光影画廊</h1>
      </Link>
      <nav className="hidden md:flex space-x-6 items-center">
        {/* NavLink 可以根据当前路由是否匹配来添加 active 样式 */}
        <NavLink to="/" className={({ isActive }) => isActive ? "text-blue-400" : "hover:text-blue-400 transition"}>首页</NavLink>
        <NavLink to="/gallery" className={({ isActive }) => isActive ? "text-blue-400" : "hover:text-blue-400 transition"}>3D展廊</NavLink>
        <NavLink to="/upload" className={({ isActive }) => isActive ? "text-blue-400" : "hover:text-blue-400 transition"}>上传作品</NavLink>
      </nav>
      <div className="space-x-4">
          <Link to="/login" className="bg-transparent hover:bg-blue-600 border border-blue-600 text-white font-bold py-2 px-4 rounded-lg transition">
            登录
          </Link>
          <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
            注册
          </Link>
      </div>
    </div>
  </header>
);

export default Header;