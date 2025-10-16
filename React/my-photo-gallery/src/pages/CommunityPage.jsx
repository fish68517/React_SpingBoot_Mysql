import React, { useState } from 'react';

// 模拟的技巧文章数据
const mockPosts = [
  { id: 1, title: '人像摄影入门：如何用好自然光', author: '张宇', tags: ['人像摄影', '用光技巧'], excerpt: '自然光是人像摄影的灵魂。本文将详细介绍如何在不同天气和时段，利用自然光拍出通透、有质感的人像照片...' },
  { id: 2, title: '风光后期处理：RAW格式调色全流程', author: '周艳秋', tags: ['风光后期', 'Photoshop'], excerpt: '从RAW文件的基础调整到色彩分离、锐化输出，一步步教你如何将一张平淡的风光照变得震撼人心...' },
  { id: 3, title: '街头摄影的构图法则', author: '社区大师', tags: ['街头摄影', '构图'], excerpt: '决定性瞬间、框架式构图、引导线... 掌握这些经典的街头摄影构图技巧，让你的作品更具故事感。' },
  { id: 4, title: '手机也能拍大片：夜景模式详解', author: '科技博主', tags: ['手机摄影', '夜景'], excerpt: '别小看你的手机！本文将深入解析各大品牌手机的夜景模式原理，并教你如何用它拍出清晰、噪点少的夜景照片。' },
];

// 搜索和标签筛选组件
const FilterControls = ({ onSearch, onTagSelect }) => {
  const tags = ['全部', '人像摄影', '风光后期', '街头摄影', '手机摄影', '用光技巧', '构图'];
  const [activeTag, setActiveTag] = useState('全部');

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    onTagSelect(tag);
  };

  return (
    <div className="mb-12">
      <div className="max-w-lg mx-auto mb-6">
        <input 
          type="text" 
          placeholder="搜索技巧文章..." 
          className="w-full bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center flex-wrap gap-3">
        {tags.map(tag => (
          <button 
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeTag === tag 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

// 技巧文章卡片组件
const PostCard = ({ post }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-shadow">
    <div className="flex flex-wrap gap-2 mb-4">
      {post.tags.map(tag => (
        <span key={tag} className="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
      ))}
    </div>
    <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
    <p className="text-gray-400 mb-4">作者: {post.author}</p>
    <p className="text-gray-300 mb-6">{post.excerpt}</p>
    <a href="#" className="font-semibold text-blue-400 hover:underline">阅读全文 &rarr;</a>
  </div>
);


const CommunityPage = () => {
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const results = mockPosts.filter(post => 
      post.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      post.excerpt.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredPosts(results);
  };

  const handleTagSelect = (tag) => {
    if (tag === '全部') {
      setFilteredPosts(mockPosts);
    } else {
      const results = mockPosts.filter(post => post.tags.includes(tag));
      setFilteredPosts(results);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-8">摄影技巧社区</h2>
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">在这里，分享你的知识，学习他人的经验，共同成长。</p>
      
      <FilterControls onSearch={handleSearch} onTagSelect={handleTagSelect} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
