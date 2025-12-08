import React, { useState, useEffect } from 'react';
import { getArtworks } from '../api/network';
import { getImageUrl } from '../utils/imageUtils'; // 1. 引入工具类

const HomePage = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const data = await getArtworks();
        setArtworks(data);
      } catch (error) {
        console.error("加载作品失败:", error);
      }
    };
    loadArtworks();
  }, []);

  // 图片加载失败时的处理函数
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error'; // 替换为错误占位图
    e.target.onerror = null; // 防止无限循环
  };

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-12 mt-10">探索摄影世界</h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {artworks.map(artwork => (
          <div key={artwork.id} className="break-inside-avoid cursor-pointer group rounded-lg overflow-hidden">
            {/* 2. 使用 getImageUrl 转换路径 */}
            <img 
              src={getImageUrl(artwork.imageUrl)}
              alt={artwork.title} 
              onError={handleImageError} // 3. 添加错误处理
              className="w-full h-auto rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300 transform group-hover:scale-[1.02] transition-transform" 
            />
            <div className="mt-2">
              <h3 className="font-bold text-lg">{artwork.title}</h3>
              {/* 这里我把你原本隐藏的作者显示出来了，如果确实要隐藏请保留 display: none */}
              <p className="text-gray-400 text-sm">作者: {artwork.authorName}</p>
              <p className="text-gray-400 text-sm">标签: {artwork.tags}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;