import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// 导入布局组件
import UserLayout from './components/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';

// 导入所有前台页面
import HomePage from './pages/HomePage';
import Gallery3DPage from './pages/Gallery3DPage';
import UploadPage from './pages/UploadPage';
import CommunityPage from './pages/CommunityPage';

// 导入独立的登录/注册页面
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// 导入所有后台管理页面
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import ArtworkApproval from './pages/admin/ArtworkApproval';
import CommentManagement from './pages/admin/CommentManagement';
import ContentRec from './pages/admin/ContentRec';


function App() {
  return (
    // <Routes> 是所有路由规则的容器
    <Routes>
      
      {/* --- 前台页面路由 --- */}
      {/* 所有匹配 "/" 根路径下的路由，都会先加载 UserLayout 组件 */}
      <Route path="/" element={<UserLayout />}>
        {/* index 表示根路径 "/" 的默认页面 */}
        <Route index element={<HomePage />} /> 
        <Route path="gallery" element={<Gallery3DPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="upload" element={<UploadPage />} />
      </Route>

      {/* --- 后台管理路由 --- */}
      {/* 所有匹配 "/admin" 路径下的路由，都会先加载 AdminLayout 组件 */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* index + Navigate 表示访问 "/admin" 时，自动跳转到 "/admin/dashboard" */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="artworks" element={<ArtworkApproval />} />
        <Route path="comments" element={<CommentManagement />} />
        <Route path="recommend" element={<ContentRec />} />
      </Route>

      {/* --- 独立页面路由 (没有通用布局) --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

    </Routes>
  );
}

export default App;