import React, { useState } from 'react';

// --- Helper Data & Components ---

// 模拟的摄影作品数据
const mockArtworks = [
  { id: 1, title: '城市之光', author: '张宇', imageUrl: 'https://placehold.co/600x400/232323/ffffff?text=City+Lights' },
  { id: 2, title: '静谧森林', author: '周艳秋', imageUrl: 'https://placehold.co/600x800/2a2a2a/ffffff?text=Quiet+Forest' },
  { id: 3, title: '星空下的轨迹', author: 'AI 摄影师', imageUrl: 'https://placehold.co/800x600/282828/ffffff?text=Star+Trails' },
  { id: 4, title: '海的呼吸', author: '张宇', imageUrl: 'https://placehold.co/600x400/313131/ffffff?text=Ocean+Breath' },
  { id: 5, title: '街头瞬间', author: '周艳秋', imageUrl: 'https://placehold.co/400x600/353535/ffffff?text=Street+Moment' },
  { id: 6, title: '山间晨雾', author: 'AI 摄影师', imageUrl: 'https://placehold.co/600x400/3a3a3a/ffffff?text=Mountain+Mist' },
];

// 图标组件 (使用 SVG)
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

// --- 页面组件 ---

// 导航栏组件
const Header = ({ setPage }) => (
  <header className="bg-gray-900 bg-opacity-80 backdrop-blur-sm text-white p-4 fixed top-0 left-0 right-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setPage('home')}>
        <CameraIcon />
        <h1 className="text-xl font-bold">光影画廊</h1>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a href="#" className="hover:text-blue-400 transition" onClick={(e) => { e.preventDefault(); setPage('home'); }}>首页</a>
        <a href="#" className="hover:text-blue-400 transition" onClick={(e) => { e.preventDefault(); setPage('gallery3d'); }}>3D展廊</a>
        <a href="#" className="hover:text-blue-400 transition" onClick={(e) => { e.preventDefault(); setPage('upload'); }}>上传作品</a>
      </nav>
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition" onClick={() => setPage('profile')}>
        我的主页
      </button>
    </div>
  </header>
);

// 首页/作品展示模块
const HomePage = ({ artworks, setSelectedArtwork }) => (
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center mb-12">探索摄影世界</h2>
    {/* Masonry Grid Layout for Photos */}
    <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
      {artworks.map(artwork => (
        <div key={artwork.id} className="mb-8 break-inside-avoid cursor-pointer group" onClick={() => setSelectedArtwork(artwork)}>
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

// 作品详情页 (模拟弹窗)
const DetailModal = ({ artwork, close }) => {
  if (!artwork) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={close}>
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full m-4 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="md:flex">
          <div className="md:w-2/3">
             <img src={artwork.imageUrl.replace('600x400', '1200x800').replace('400x600', '800x1200').replace('600x800', '800x1200')} alt={artwork.title} className="w-full h-full object-cover"/>
          </div>
          <div className="p-8 md:w-1/3 flex flex-col">
            <h2 className="text-3xl font-bold mb-2">{artwork.title}</h2>
            <p className="text-gray-400 text-lg mb-4">作者: {artwork.author}</p>
            <div className="bg-gray-700 p-4 rounded-lg mb-4 flex-grow">
              <h4 className="font-semibold mb-2">作品信息</h4>
              <p className="text-sm text-gray-300">这里是作品的详细描述、拍摄参数（光圈、快门、ISO）和创作思路等。</p>
            </div>
             {/* 互动交流模块 */}
            <div className="space-y-4">
                <textarea className="w-full bg-gray-900 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="发表你的评论..."></textarea>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button className="text-gray-300 hover:text-red-500 transition">❤️ 点赞</button>
                        <button className="text-gray-300 hover:text-yellow-500 transition">⭐ 收藏</button>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">提交</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// 3D 展廊模块 (占位符)
const Gallery3DPage = () => (
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4">沉浸式 3D 展廊</h2>
    <p className="text-gray-400 mb-8">这是使用 Three.js 构建的 3D 虚拟展览空间。</p>
    <div className="bg-gray-800 aspect-video w-full max-w-4xl mx-auto rounded-lg flex items-center justify-center">
      <p className="text-xl">3D 场景渲染区域</p>
    </div>
    <div className="mt-4 text-left max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold">下一步:</h3>
      <ul className="list-disc list-inside mt-2 text-gray-300">
        <li>引入 Three.js, React Three Fiber 库。</li>
        <li>创建一个 Canvas 组件来渲染 3D 场景。</li>
        <li>加载 3D 模型 (如展厅、相框)。</li>
        <li>将摄影作品作为纹理贴图应用到相框模型上。</li>
        <li>实现相机控制 (OrbitControls) 允许用户自由浏览。</li>
      </ul>
    </div>
  </div>
);

// 作品上传模块
const UploadPage = () => (
    <div className="container mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold text-center mb-8">上传你的作品</h2>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="photo-upload">
                    选择图片文件
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-gray-700 transition">
                    <p className="text-gray-400">拖拽文件到这里, 或点击选择</p>
                    <input type="file" id="photo-upload" className="opacity-0 absolute" multiple />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                    作品标题
                </label>
                <input className="w-full bg-gray-900 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" id="title" type="text" placeholder="例如：黄昏下的思考" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
                    作品描述 / 创作思路
                </label>
                <textarea className="w-full bg-gray-900 rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500" id="description" placeholder="分享你的创作故事..."></textarea>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition text-lg">
                发布作品
            </button>
        </div>
    </div>
);


// 个人主页/用户认证模块
const ProfilePage = () => (
    <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <img 
                src="https://placehold.co/150x150/555555/ffffff?text=Avatar" 
                alt="User Avatar" 
                className="w-36 h-36 rounded-full border-4 border-blue-500"
            />
            <div>
                <h2 className="text-4xl font-bold">张宇</h2>
                <p className="text-gray-400 mt-2">一个热爱用光影记录世界的摄影师。欢迎来到我的画廊！</p>
                <div className="mt-4">
                    <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition">
                        编辑个人资料
                    </button>
                </div>
            </div>
        </div>
        <div className="mt-12">
            <h3 className="text-3xl font-bold mb-6">我发布的作品</h3>
            {/* 这里可以复用 HomePage 的作品网格布局 */}
             <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
                {mockArtworks.filter(a => a.author === '张宇').map(artwork => (
                    <div key={artwork.id} className="mb-8 break-inside-avoid group">
                    <img 
                        src={artwork.imageUrl}
                        alt={artwork.title} 
                        className="w-full h-auto rounded-lg shadow-lg group-hover:opacity-80 transition-opacity duration-300" 
                    />
                    </div>
                ))}
            </div>
        </div>
    </div>
);


// 主应用组件
export default function App() {
  // 使用 state 来模拟页面路由切换
  const [page, setPage] = useState('home');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage artworks={mockArtworks} setSelectedArtwork={setSelectedArtwork} />;
      case 'gallery3d':
        return <Gallery3DPage />;
      case 'upload':
        return <UploadPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage artworks={mockArtworks} setSelectedArtwork={setSelectedArtwork} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <Header setPage={setPage} />
      <main className="pt-24 pb-12">
        {renderPage()}
      </main>
      <DetailModal artwork={selectedArtwork} close={() => setSelectedArtwork(null)} />
    </div>
  );
}
