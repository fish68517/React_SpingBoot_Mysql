import React, { useState, useEffect } from 'react';
import { getArtworks } from '../api/network';
import { getImageUrl } from '../utils/imageUtils';

// --- 0. 引入本地图片资源 ---
// 请确保在 src/assets 下有这三张图片，或者修改为你实际的文件名
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

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



// --- 组件 1: 轮播图组件 (新增) ---
const Carousel = () => {
  const slides = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  // 自动轮播逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // 5秒切换一次
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[300px] md:h-[500px] overflow-hidden group">
      {/* 图片容器 */}
      <div 
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img 
              src={slide} 
              alt={`Banner ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* 左箭头 */}
      <button 
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>

      {/* 右箭头 */}
      <button 
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* 底部指示点 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
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
const SortableArtwork = ({ artwork, isEditing, handleImageError }) => {
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
      
      {/* 编辑模式下的提示图标 (可选) */}
      {isEditing && (
        <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
        </div>
      )}

      <div className="p-4">
        <h3 className="font-bold text-lg truncate">{artwork.title}</h3>
        <p className="text-gray-500 text-sm">作者: {artwork.authorName}</p>
        <p className="text-gray-400 text-xs mt-1">分类: {artwork.tags}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [artworks, setArtworks] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // 控制编辑模式状态

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

  return (

        // 注意：这里去掉了 min-h-screen 的上下 padding，为了让轮播图贴顶
    <div className="min-h-screen bg-gray-50 pb-20">
       {/* 1. 放置轮播图在最顶端 */}
      <Carousel />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 mt-10 relative">
          <h2 className="text-4xl font-bold text-center">探索摄影世界</h2>
          
          {/* --- 4. 切换编辑/固定模式的按钮 --- */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`mt-6 px-6 py-2 rounded-full font-semibold transition-colors shadow-sm ${
              isEditing 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isEditing ? '完成编辑 (固定位置)' : '编辑位置'}
          </button>
        </div>

        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={artworks.map(a => a.id)} 
            strategy={rectSortingStrategy} // 适合网格布局的策略
          >
            {/* 
              注意：这里将 columns-x 改为了 grid-cols-x。
              Grid 布局对于拖拽排序更稳定，瀑布流(columns)会导致DOM顺序与视觉顺序不一致 
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworks.map((artwork) => (
                <SortableArtwork 
                  key={artwork.id} 
                  artwork={artwork} 
                  isEditing={isEditing}
                  handleImageError={handleImageError}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default HomePage;