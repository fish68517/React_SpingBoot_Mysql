import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Gallery3DPage from './pages/Gallery3DPage';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // 假设你已经创建了此文件

function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header />
      <main className="pt-24 pb-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<Gallery3DPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* 在这里可以继续添加更多路由，比如用户个人主页 */}
          {/* <Route path="/profile/:userId" element={<ProfilePage />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;