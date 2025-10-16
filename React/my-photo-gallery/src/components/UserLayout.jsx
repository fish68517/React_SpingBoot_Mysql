import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; // 引入导航栏

const UserLayout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="pt-24 pb-12">
        {/* 所有前台子页面的内容将在这里显示 */}
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;