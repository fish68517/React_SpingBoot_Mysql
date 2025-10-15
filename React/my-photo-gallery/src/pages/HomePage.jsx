import React, { useState, useEffect } from 'react';
import { getArtworks } from '../api/network'; // 引入新的 API 请求

const HomePage = () => {
  const [artworks, setArtworks] = useState([]);

  // 使用 useEffect 在组件加载时获取数据
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
  }, []); // 空依赖数组表示只在组件首次渲染时执行

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">探索摄影世界</h2>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {artworks.map(artwork => (
          <div key={artwork.id} className="mb-8 break-inside-avoid cursor-pointer group">
            <img 
              src={artwork.imageUrl}
              alt={artwork.title} 
              className="w-full h-auto rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300" 
            />
            <div className="mt-2">
              <h3 className="font-bold text-lg">{artwork.title}</h3>
              <p className="text-gray-400">作者: {artwork.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;