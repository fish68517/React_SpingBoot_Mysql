import React, { useState, useEffect,useMemo, } from 'react';
import { getArtworks, deleteArtwork, updateArtwork,getBannerArtwork} from '../api/network';
import { getImageUrl } from '../utils/imageUtils';

// --- 0. 引入本地图片资源 ---
// 请确保在 src/assets 下有这三张图片，或者修改为你实际的文件名
// import banner1 from '../assets/banner1.jpg';
// import banner2 from '../assets/banner2.jpg';
// import banner3 from '../assets/banner3.jpg';




// --- 1. 引入 dnd-kit 相关依赖 ---
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


// --- 新版本：动态轮播图组件 ---
const Carousel = ({ bannerArtworks }) => {
  // 如果没有数据，显示占位或空状态
  if (!bannerArtworks || bannerArtworks.length === 0) {
    return (
      <div className="relative w-full h-[300px] md:h-[500px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">暂无轮播图</p>
      </div>
    );
  }

  const [current, setCurrent] = useState(0);

  // 自动轮播逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === bannerArtworks.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [bannerArtworks.length]);


  const goToSlide = (index) => {
    setCurrent(index);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? bannerArtworks.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === bannerArtworks.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden group">
      {/* 图片容器 */}

      <div 
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {bannerArtworks.map((artwork, index) => (
          <div key={artwork.id} className="w-full h-full flex-shrink-0">
            <img 
              src={getImageUrl(artwork.imageUrl)}
              alt={artwork.title || `Banner ${index + 1}`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/1200x500?text=Image+Loading+Error';
              }}
            />
            {/* 可选：显示标题叠加在图片上 */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h2 className="text-white text-2xl md:text-4xl font-bold">{artwork.title}</h2>
              <p className="text-white/80 text-sm md:text-base mt-2">{artwork.authorName}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 左右箭头和底部指示点（保持不变） */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {bannerArtworks.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              current === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


// --- 2. 创建可排序的单个 Artwork 组件 ---
const SortableArtwork = ({ artwork, isEditing, handleImageError ,onDelete,onEdit}) => {
  // useSortable 钩子提供了拖拽所需的属性和样式
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: artwork.id, disabled: !isEditing });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto', // 拖拽时层级提高
    opacity: isDragging ? 0.5 : 1,    // 拖拽时半透明
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group rounded-lg overflow-hidden bg-white shadow-md ${
        isEditing ? 'cursor-move hover:ring-2 hover:ring-blue-500' : 'cursor-pointer'
      }`}
    >
      <img 
        src={getImageUrl(artwork.imageUrl)}
        alt={artwork.title} 
        onError={handleImageError}
        className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-300" 
      />
      
       {/* --- 编辑模式下的操作按钮 --- */}
      {isEditing && (
        <div className="absolute top-2 right-2 flex space-x-2 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); onEdit(artwork); }}
            className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow-sm transition"
            title="修改"
            style={{ display: false ? 'block' : 'none' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(artwork.id); }}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 shadow-sm transition"
            title="删除"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{artwork.title}</h3>
        <p className="text-gray-500 text-sm">作者: {artwork.authorName}</p>
        <p className="text-gray-400 text-xs mt-1">分类: {artwork.tags}</p>
         {/* 简单的标签展示 */}
            <div className="flex space-x-1">
                {artwork.tags && artwork.tags.split(',').slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [artworks, setArtworks] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // 控制编辑模式状态
  const [selectedTag, setSelectedTag] = useState('全部');
  const [bannerArtworks, setBannerArtworks] = useState([]); // 新增：专门存轮播图数据

  // === 新增这一行 ===
  const [loading, setLoading] = useState(true);  // 用于控制轮播图加载状态

  // 配置传感器 (鼠标和触摸)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 移动8像素才触发拖拽，防止误触点击
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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


  // 新增：加载轮播图数据
  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const data = await getBannerArtwork(); // 假设你写了这个 API 函数
        setBannerArtworks(data);         // data 是数组，如 [{id, title, content, image}, ...]
      } catch (error) {
        console.error("加载轮播图失败:", error);
        setBannerArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    loadBanners();
  }, []); // 只加载一次


    // --- 3. 自动计算所有唯一标签 ---
  const allTags = useMemo(() => {
    const tags = new Set(['全部']);
    artworks.forEach(work => {
        if (work.tags) {
            work.tags.split(',').forEach(t => tags.add(t.trim()));
        }
    });
    return Array.from(tags);
  }, [artworks]);

    // --- 4. 根据标签筛选数据 ---
  const filteredArtworks = useMemo(() => {
    if (selectedTag === '全部') return artworks;
    return artworks.filter(work => work.tags && work.tags.includes(selectedTag));
  }, [artworks, selectedTag]);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
    e.target.onerror = null;
  };

  // --- 3. 处理拖拽结束 ---
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setArtworks((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        // 这里你可能需要调用 API 保存新的顺序
        // saveNewOrder(arrayMove(items, oldIndex, newIndex)); 
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };


    // --- 处理删除 (前端模拟删除) ---
  const handleDelete = (id) => {
    if (window.confirm('确定要删除这张作品吗？')) {
        setArtworks(prev => prev.filter(item => item.id !== id));
        // 这里应调用后端 API: await deleteArtwork(id);
        deleteArtwork(id);
        alert('删除成功');
    }
  };

  // --- 处理编辑 (占位符) ---
  const handleEdit = (artwork) => {
    // 实际项目中这里应该打开一个 EditModal，类似 UserManagement 中的
    alert(`编辑功能开发中...\n正在编辑: ${artwork.title}`);
    updateArtwork(artwork.id, artwork);
  };


  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Carousel bannerArtworks={bannerArtworks} />
      
      <div className="container mx-auto px-4">
        {/* 控制栏区域 */}
        <div className="flex flex-col items-center mb-8 mt-10 space-y-6">
          
          {/* --- 标签过滤器 --- */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map(tag => (
                <button
                    key={tag}
                    onClick={() => {
                        setSelectedTag(tag);
                        // 如果切换标签，建议退出编辑模式，因为排序只在全量数据下有意义
                        if (tag !== '全部') setIsEditing(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedTag === tag 
                        ? 'bg-gray-900 text-white shadow-md scale-105' 
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                    {tag}
                </button>
            ))}
          </div>

          {/* --- 编辑模式开关 --- */}
          {/* 只有在 "全部" 标签下才允许开启排序/编辑模式，防止数据错乱 */}
          {selectedTag === '全部' ? (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center space-x-2 px-6 py-2 rounded-full font-semibold transition-colors shadow-sm ${
                  isEditing 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {isEditing ? (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span>完成编辑</span>
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        <span>管理与排序</span>
                    </>
                )}
              </button>
          ) : (
              <p className="text-sm text-gray-400">切换回“全部”标签以进行排序和管理</p>
          )}
        </div>

        {/* 列表区域 */}
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={filteredArtworks.map(a => a.id)} 
            strategy={rectSortingStrategy}
          >
            {filteredArtworks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArtworks.map((artwork) => (
                    <SortableArtwork 
                    key={artwork.id} 
                    artwork={artwork} 
                    isEditing={isEditing}
                    handleImageError={handleImageError}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    />
                ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    该分类下暂无作品
                </div>
            )}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default HomePage;