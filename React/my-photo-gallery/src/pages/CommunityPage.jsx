import React, { useState, useEffect } from 'react';
import { getCommunityPosts, createCommunityPost } from '../api/network';

// 预定义的标签列表
const AVAILABLE_TAGS = ['人像摄影', '风光后期', '街头摄影', '手机摄影', '用光技巧', '构图', '器材评测'];

// --- 搜索和标签筛选组件 ---
const FilterControls = ({ onSearch, onTagSelect, activeTag }) => {
  return (
    <div className="mb-8">
      <div className="max-w-lg mx-auto mb-6">
        <input 
          type="text" 
          placeholder="搜索技巧文章..." 
          className="w-full bg-gray-800 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-center flex-wrap gap-3">
        <button 
            onClick={() => onTagSelect('全部')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeTag === '全部' ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
        >
            全部
        </button>
        {AVAILABLE_TAGS.map(tag => (
          <button 
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeTag === tag ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- 文章详情模态框组件 (已更新：集成评论获取与输入) ---
const PostDetailModal = ({ post, onClose }) => {
    if (!post) return null;

    // 状态：评论列表、输入框内容、加载状态
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);

    // 1. 获取评论列表 (根据 post.id)
    useEffect(() => {
        if (post && post.id) {
            setLoadingComments(true);
            // 假设后端接口地址为 /api/community/posts/{id}/comments
            fetch(`http://localhost:8080/api/admin/comments/post/${post.id}`)
                .then(res => {
                    if (res.ok) return res.json();
                    return []; // 如果接口报错或无数据，返回空数组
                })
                .then(data => {
                    // 确保数据是数组
                    setComments(Array.isArray(data) ? data : []);
                })
                .catch(err => {
                    console.error("获取评论失败:", err);
                    setComments([]);
                })
                .finally(() => setLoadingComments(false));
        }
    }, [post]);

    // 2. 发送评论
    const handleSendComment = async () => {
        if (!newComment.trim()) return;

        // 从localStorage 获取用户  //localStorage.setItem('userInfo', JSON.stringify(userInfo));
        const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        const userId = userInfo.id;

        try {
            const response = await fetch(`http://localhost:8080/api/admin/comments/post/${post.id}/${userId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    content: newComment,
                    // 如果后端需要 userId，通常从 token 解析，这里仅发送内容
                })
            });

            if (response.ok) {
                const savedComment = await response.json();
                // 将新评论添加到列表 (假设后端返回保存后的评论对象)
                // 如果后端不返回对象，可以手动构造一个临时的
                setComments(prev => [savedComment, ...prev]);
                setNewComment(""); // 清空输入框
            } else {
                alert("评论发送失败");
            }
        } catch (error) {
            console.error("发送评论出错:", error);
            alert("评论发送失败");
        }
    };

    // 模拟显示内容 (如果 content 为空)
    const displayContent = post.content || post.excerpt;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-gray-900 w-full max-w-4xl h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col relative border border-gray-800" 
                onClick={e => e.stopPropagation()}
            >
                {/* 顶部导航栏 */}
                <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-gray-900 shrink-0">
                    <div className="flex items-center space-x-3">
                         <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                            {post.author ? post.author[0] : 'User'}
                         </div>
                         <div>
                             <p className="font-bold text-white text-lg">{post.author}</p>
                             <p className="text-sm text-gray-400">{post.date}</p>
                         </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 hover:text-white transition text-2xl"
                    >
                        &times;
                    </button>
                </div>

                {/* 滚动内容区域 */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags && post.tags.map(tag => (
                            <span key={tag} className="bg-gray-800 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-line leading-relaxed mb-12">
                        {displayContent}
                    </div>
                    
                    {/* 评论区展示 */}
                    <div className="pt-8 border-t border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-6">评论区 ({comments.length})</h3>
                        
                        {loadingComments ? (
                            <div className="text-center text-gray-500 py-4">加载评论中...</div>
                        ) : comments.length > 0 ? (
                            <div className="space-y-6">
                                {comments.map((comment, index) => (
                                    <div key={comment.id || index} className="flex space-x-4">
                                        <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs text-white">
                                            {comment.user ? comment.user[0] : 'U'}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-white text-sm">{comment.author.username || '匿名用户'}</span>
                                                <span className="text-xs text-gray-500">{comment.createdAt || '刚刚'}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm mt-1">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-800 rounded-lg p-6 text-center text-gray-500">
                                暂无评论，快来抢沙发吧！
                            </div>
                        )}
                    </div>
                </div>

                {/* 底部互动栏：改为输入框 */}
                <div className="p-4 bg-gray-800 border-t border-gray-700 shrink-0">
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-2 text-gray-400" style={{ display: 'none' }}>
                             <button className="hover:text-red-500 transition px-2">
                                ❤️
                            </button>
                             <button className="hover:text-yellow-500 transition px-2">
                                ⭐
                            </button>
                        </div>
                        <div className="flex-1 flex space-x-2">
                            <input 
                                type="text" 
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="写下你的评论..."
                                className="flex-1 bg-gray-900 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700 placeholder-gray-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                            />
                            <button 
                                onClick={handleSendComment}
                                disabled={!newComment.trim()}
                                className={`px-6 py-2 rounded-lg font-semibold transition ${
                                    newComment.trim() 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                发送
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 技巧文章卡片组件 ---
const PostCard = ({ post, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer group"
  >
    <div className="flex flex-wrap gap-2 mb-4">
      {post.tags.map(tag => (
        <span key={tag} className="bg-gray-700 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
      ))}
    </div>
    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{post.title}</h3>
    <div className="text-sm text-gray-500 mb-4 flex justify-between">
        <span>作者: {post.author}</span>
        <span>{post.date}</span>
    </div>
    <p className="text-gray-300 mb-6 flex-grow line-clamp-3">{post.excerpt || post.content}</p>
    <div className="mt-auto">
        <span className="font-semibold text-blue-400 group-hover:underline inline-block">阅读全文 &rarr;</span>
    </div>
  </div>
);

// --- 发布文章的弹窗组件 ---
const CreatePostModal = ({ onClose, onPublish }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleTag = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            if (selectedTags.length >= 3) return; // 限制最多选3个
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || selectedTags.length === 0) {
            alert("请填写完整信息（标题、内容和至少一个标签）");
            return;
        }
        setIsSubmitting(true);
        // 构建新文章数据对象
        const newPost = {
            title,
            excerpt: content.substring(0, 100) + '...', // 自动截取摘要
            content,
            tags: selectedTags,
        };
        await onPublish(newPost);
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full shadow-2xl p-6" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                    <h3 className="text-2xl font-bold text-white">发布摄影技巧</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">文章标题</label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="w-full bg-gray-900 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="例如：如何利用引导线构图"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">选择标签 (最多3个)</label>
                        <div className="flex flex-wrap gap-2">
                            {AVAILABLE_TAGS.map(tag => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1 rounded-full text-xs font-semibold transition border ${
                                        selectedTags.includes(tag)
                                            ? 'bg-blue-600 border-blue-600 text-white'
                                            : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400'
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2">正文内容</label>
                        <textarea 
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="w-full bg-gray-900 text-white rounded-lg p-3 h-40 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                            placeholder="分享你的独家摄影心得..."
                        />
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition"
                        >
                            取消
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`px-6 py-2 rounded-lg text-white font-bold transition ${
                                isSubmitting ? 'bg-blue-800 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                        >
                            {isSubmitting ? '发布中...' : '确认发布'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- 主页面组件 ---
const CommunityPage = () => {
  const [posts, setPosts] = useState([]); // 所有文章
  const [filteredPosts, setFilteredPosts] = useState([]); // 筛选后的文章
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('全部');
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); // 控制详情页显示
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  // 1. 初始化加载数据和检查登录状态
  useEffect(() => {
    const checkLogin = () => {
        // 演示模式：默认已登录
        setIsLoggedIn(true); 
    };
    checkLogin();

    const loadPosts = async () => {
        try {
            const data = await getCommunityPosts();
            setPosts(data);
            setFilteredPosts(data);
        } catch (error) {
            console.error("加载社区文章失败", error);
        }
    };
    loadPosts();
  }, []);

  // 2. 处理搜索和筛选逻辑
  useEffect(() => {
    let result = posts;

    if (activeTag !== '全部') {
        result = result.filter(post => post.tags.includes(activeTag));
    }

    if (searchTerm.trim() !== '') {
        const lowerTerm = searchTerm.toLowerCase();
        result = result.filter(post => 
            post.title.toLowerCase().includes(lowerTerm) || 
            post.excerpt.toLowerCase().includes(lowerTerm)
        );
    }

    setFilteredPosts(result);
  }, [searchTerm, activeTag, posts]);

  // 3. 处理新文章发布
  const handlePublishPost = async (newPostData) => {
      try {
          const createdPost = await createCommunityPost(newPostData);
          const updatedPosts = [createdPost, ...posts];
          setPosts(updatedPosts);
          setShowCreateModal(false); 
          alert("发布成功！");
      } catch (error) {
          alert("发布失败，请重试");
      }
  };

  return (
    <div className="container mx-auto px-4 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-white">摄影技巧社区</h2>
        {/* 仅登录用户可见发布按钮 */}
        {isLoggedIn && (
            <button 
                onClick={() => setShowCreateModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition flex items-center"
            >
                <span className="mr-2 text-xl">+</span> 发布技巧
            </button>
        )}
      </div>
      
      <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">在这里，分享你的知识，学习他人的经验，共同成长。</p>
      
      <FilterControls 
        onSearch={setSearchTerm} 
        onTagSelect={setActiveTag} 
        activeTag={activeTag}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
            <PostCard 
                key={post.id} 
                post={post} 
                onClick={() => setSelectedPost(post)} // 点击打开详情
            />
            ))
        ) : (
            <div className="col-span-full text-center text-gray-500 py-10">
                暂无相关文章，快来发布第一篇吧！
            </div>
        )}
      </div>

      {/* 发布弹窗 */}
      {showCreateModal && (
          <CreatePostModal 
            onClose={() => setShowCreateModal(false)} 
            onPublish={handlePublishPost}
          />
      )}

      {/* 详情页弹窗 (新增加的功能) */}
      <PostDetailModal 
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
};

export default CommunityPage;