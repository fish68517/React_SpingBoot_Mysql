import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

// 定义一些图标，让界面更直观
const ICONS = {
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10M18 20V4M6 20V16"/></svg>,
  Users: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Artworks: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5c-2.4 2.4-6 2.4-8.4 0l-6-6c-2.4-2.4-2.4-6 0-8.4l1.5-1.5"/></svg>,
  Comments: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Recommend: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

const AdminLayout = () => {
  const menuItems = [
    { to: "/admin/dashboard", text: "数据统计看板", icon: <ICONS.Dashboard /> },
    { to: "/admin/users", text: "用户管理", icon: <ICONS.Users /> },
    { to: "/admin/artworks", text: "作品审核", icon: <ICONS.Artworks /> },
    { to: "/admin/comments", text: "评论管理", icon: <ICONS.Comments /> },
    { to: "/admin/recommend", text: "内容推荐", icon: <ICONS.Recommend /> },
  ];

  // NavLink 的 active 样式
  const activeLinkStyle = {
    backgroundColor: '#2563EB', // blue-600
    color: 'white',
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* 左侧菜单导航栏 */}
      <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold text-center mb-8">后台管理</h1>
          <nav className="flex flex-col space-y-2">
            {menuItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
              >
                {item.icon}
                <span>{item.text}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <Link to="/" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition border-t border-gray-700 mt-4">
            <ICONS.Home />
            <span>返回网站首页</span>
        </Link>
      </aside>

      {/* 右侧内容区 */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* 子路由的页面会在这里渲染 */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;