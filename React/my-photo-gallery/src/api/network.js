// 定义你的 Spring Boot 后端 API 基础地址
const BASE_URL = 'http://localhost:8080/api'; // 示例地址，请根据你的后端修改

/**
 * 封装 fetch 请求
 * @param {string} endpoint - API 的端点 (例如 /artworks)
 * @param {object} options - fetch 的配置对象 (例如 method, headers, body)
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  // 默认请求头
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      // 如果服务器返回错误状态码，可以进行统一的错误处理
      const errorData = await response.json();
      throw new Error(errorData.message || '网络请求失败');
    }
    // 检查响应是否有内容
    if (response.status === 204) {
      return null; // No Content
    }
    const text = await response.text();
    // 打印 text
    console.log('API 响应:', text);
    return text ? JSON.parse(text) : {};
  } catch (error) {
    console.error('API 请求出错:', error);
    throw error; // 将错误继续向上抛出，以便组件可以捕获
  }
}

// --- 以下是具体的 API 请求函数 ---

// 获取作品列表
// 获取作品列表
export const getArtworks = () => {
  return request('/artworks'); // 真实接口
  console.log("正在请求作品列表...");
  // return Promise.resolve([
  //   { id: 1, title: '城市之光', author: '张宇', imageUrl: 'https://placehold.co/600x400/232323/ffffff?text=City+Lights' },
  //   { id: 2, title: '静谧森林', author: '周艳秋', imageUrl: 'https://placehold.co/600x800/2a2a2a/ffffff?text=Quiet+Forest' },
  //   { id: 3, title: '星空下的轨迹', author: 'AI 摄影师', imageUrl: 'https://placehold.co/800x600/282828/ffffff?text=Star+Trails' },
  //   { id: 4, title: '海的呼吸', author: '张宇', imageUrl: 'https://placehold.co/600x400/313131/ffffff?text=Ocean+Breath' },
  // ]);
};

// 用户登录
export const loginUser = (credentials) => {
  console.log("正在登录:", credentials);
  // 模拟登录成功
  // return Promise.resolve({ token: 'fake-jwt-token', user: { name: '张宇' } });
  
  return request('/auth/login', { // 真实接口
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
};

// 用户注册
export const registerUser = (userInfo) => {
    console.log("正在注册:", userInfo);
    // 模拟注册成功
   // return Promise.resolve({ message: '注册成功', user: { name: userInfo.username } });
  
  return request('/auth/register', { // 真实接口
    method: 'POST',
    body: JSON.stringify(userInfo),
  });
  
};



// // --- 新增：社区相关接口 ---

// // 4. 获取社区文章列表
// export const getCommunityPosts = () => {
//     console.log("正在获取社区文章...");
//     return Promise.resolve([
//         { id: 1, title: '人像摄影入门：如何用好自然光', author: '张宇', tags: ['人像摄影', '用光技巧'], excerpt: '自然光是人像摄影的灵魂。本文将详细介绍如何在不同天气和时段，利用自然光拍出通透、有质感的人像照片...', date: '2023-10-01' },
//         { id: 2, title: '风光后期处理：RAW格式调色全流程', author: '周艳秋', tags: ['风光后期', 'Photoshop'], excerpt: '从RAW文件的基础调整到色彩分离、锐化输出，一步步教你如何将一张平淡的风光照变得震撼人心...', date: '2023-10-05' },
//         { id: 3, title: '街头摄影的构图法则', author: '社区大师', tags: ['街头摄影', '构图'], excerpt: '决定性瞬间、框架式构图、引导线... 掌握这些经典的街头摄影构图技巧，让你的作品更具故事感。', date: '2023-10-12' },
//         { id: 4, title: '手机也能拍大片：夜景模式详解', author: '科技博主', tags: ['手机摄影', '夜景'], excerpt: '别小看你的手机！本文将深入解析各大品牌手机的夜景模式原理，并教你如何用它拍出清晰、噪点少的夜景照片。', date: '2023-10-20' },
//     ]);
// };

// // 5. 发布新文章
// export const createCommunityPost = (postData) => {
//     console.log("正在发布文章:", postData);
//     // 模拟网络延迟
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve({ 
//                 id: Math.floor(Math.random() * 10000), 
//                 ...postData, 
//                 date: new Date().toISOString().split('T')[0],
//                 author: '张宇' // 模拟当前登录用户
//             });
//         }, 1000);
//     });
// };

// ==========================================
// 2. 社区功能接口 (Community) - [已更新为真实接口]
// ==========================================

// 获取社区文章列表
export const getCommunityPosts = () => {
    // 调用 Spring Boot: GET /api/community/posts
    return request('/community/posts');
};

// 发布新文章
export const createCommunityPost = (postData) => {
    // 调用 Spring Boot: POST /api/community/posts
    // postData 结构: { title, content, excerpt, tags: [] }
    return request('/community/posts', { 
        method: 'POST', 
        body: JSON.stringify(postData) 
    });
};

// --- 新增：用户管理相关接口 (Admin) ---

// 1. 获取所有用户
export const getAllUsers = () => {
    return request('/admin/users'); // 真实接口
    
    // 模拟数据
    // console.log("正在获取用户列表...");
    // return Promise.resolve([
    //     { id: 1, username: 'zhangyu', nickname: '张宇', role: 'USER', email: 'zhangyu@example.com', status: 'Active' },
    //     { id: 2, username: 'admin', nickname: '管理员', role: 'ADMIN', email: 'admin@example.com', status: 'Active' },
    //     { id: 3, username: 'guest', nickname: '访客', role: 'USER', email: 'guest@test.com', status: 'Banned' },
    // ]);
};

// 2. 创建用户
export const createUser = (userData) => {
    console.log("创建用户:", userData);
    return request('/admin/users', { method: 'POST', body: JSON.stringify(userData) });
    
    // 模拟
    // return Promise.resolve({ id: Date.now(), ...userData, status: 'Active' });
};

// 3. 更新用户
export const updateUser = (userId, userData) => {
  console.log(`更新用户 ${userId}:`, userData);
  return request(`/admin/users/${userId}`, { method: 'PUT', body: JSON.stringify(userData) });
    
    // 模拟
    
    // return Promise.resolve({ id: userId, ...userData });
};

// 4. 删除用户
export const deleteUser = (userId) => {
    console.log(`删除用户 ${userId}`);
    return request(`/admin/users/${userId}`, { method: 'DELETE' });
    
    // 模拟
    
    // return Promise.resolve({ success: true });
};


// ==========================================
// 4. 管理员接口 (Admin - 作品审核) [新增部分]
// ==========================================

// 获取待审核作品列表
export const getPendingArtworks = () => {
    return request('/admin/artworks/pending'); 
    
    console.log("正在获取待审核作品...");
    // 模拟数据
    // return Promise.resolve([
    //     { 
    //         id: 101, 
    //         title: '未知的秘境', 
    //         description: '这是我在西藏无人区拍摄的一组照片，希望能通过审核。', 
    //         imageUrl: 'https://placehold.co/600x400/333/fff?text=Pending+1', 
    //         authorName: '探险家小王', 
    //         authorAvatar: 'https://placehold.co/50', 
    //         tags: '风光,探险,西藏', 
    //         createdAt: '2023-10-25 10:30' 
    //     },
    //     { 
    //         id: 102, 
    //         title: '微距下的昆虫世界', 
    //         description: '使用百微镜头拍摄。', 
    //         imageUrl: 'https://placehold.co/600x400/444/fff?text=Pending+2', 
    //         authorName: '张宇', 
    //         authorAvatar: 'https://placehold.co/50', 
    //         tags: '微距,自然', 
    //         createdAt: '2023-10-26 14:20' 
    //     },
    // ]);
};

// 通过审核
export const approveArtwork = (id) => {
     return request(`/admin/artworks/${id}/approve`, { method: 'POST' });
    
    console.log(`作品 ${id} 审核通过`);
    //return Promise.resolve({ success: true });
};

// 驳回审核
export const rejectArtwork = (id) => {
    return request(`/admin/artworks/${id}/reject`, { method: 'POST' });
    
    console.log(`作品 ${id} 被驳回`);
    //return Promise.resolve({ success: true });
};


// ==========================================
// 5. 管理员接口 (Admin - 数据看板) [新增]
// ==========================================

export const getDashboardStats = () => {
     return request('/admin/dashboard/stats'); // 真实接口
    
    console.log("正在获取看板数据...");
    // 模拟数据
    // return Promise.resolve({
    //     totalUsers: 1024,
    //     totalArtworks: 356,
    //     totalComments: 892,
    //     pendingArtworks: 12, // 待审核数量
    //     weeklyVisits: [150, 230, 224, 218, 135, 147, 260], // 模拟一周访问量趋势
    //     recentActivities: [
    //         { id: 1, user: '张宇', action: '发布了新作品', target: '城市之光', time: '10分钟前' },
    //         { id: 2, user: '周艳秋', action: '注册了账号', target: '', time: '2小时前' },
    //         { id: 3, user: 'Admin', action: '审核通过了', target: '静谧森林', time: '5小时前' },
    //         { id: 4, user: '李四', action: '评论了', target: '星空下的轨迹', time: '1天前' },
    //     ]
    // });
};


// 6. 管理员接口 (Admin - 评论管理) [新增]
// ==========================================

export const getAllComments = () => {
    return request('/admin/comments'); // 真实接口
    
    console.log("正在获取评论列表...");
    // return Promise.resolve([
    //     { 
    //         id: 1, 
    //         user: '张宇', 
    //         avatar: 'https://placehold.co/50',
    //         content: '这张照片的光影处理简直太棒了！', 
    //         target: '城市之光', 
    //         targetType: '作品', 
    //         createdAt: '2023-10-27 10:30',
    //         status: 'Normal' 
    //     },
    //     { 
    //         id: 2, 
    //         user: 'Guest_992', 
    //         avatar: 'https://placehold.co/50',
    //         content: '加我微信 XXXXX 购买低价器材...', 
    //         target: '静谧森林', 
    //         targetType: '作品',
    //         createdAt: '2023-10-27 11:15',
    //         status: 'Reported' 
    //     },
    //     { 
    //         id: 3, 
    //         user: '李四', 
    //         avatar: 'https://placehold.co/50',
    //         content: '学到了，原来自然光还可以这样用。', 
    //         target: '人像摄影入门', 
    //         targetType: '文章',
    //         createdAt: '2023-10-26 15:20',
    //         status: 'Normal' 
    //     },
    // ]);
};

export const deleteComment = (id) => {
    // return request(`/admin/comments/${id}`, { method: 'DELETE' });
    console.log(`删除评论 ${id}`);
    return Promise.resolve({ success: true });
};


// ==========================================
// 7. 文件上传与作品发布接口 [新增]
// ==========================================

/**
 * 上传图片文件
 * @param {File} file - 用户选择的文件对象
 * @returns {Promise<string>} - 返回服务器保存的文件名 (例如 "123456.jpg")
 */
export const uploadImage = async (file) => {
    // 1. 构建 FormData 对象
    const formData = new FormData();
    formData.append('file', file); // 'file' 必须与后端 Controller 的 @RequestParam("file") 参数名一致

    // 2. 发送请求
    // 注意：fetch 上传文件时，不要手动设置 'Content-Type': 'multipart/form-data'
    // 浏览器会自动设置并加上 boundary
    const response = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        // headers: { 'Authorization': ... } // 如果有 token
        body: formData,
    });

    if (!response.ok) {
        throw new Error('图片上传失败');
    }

    // 3. 假设后端直接返回图片的文件名字符串
    const result = await response.text(); 
    return result; 
};

/**
 * 发布摄影作品 (保存元数据)
 * @param {Object} artworkData - { title, description, imageUrl, tags }
 */
export const publishArtwork = (artworkData) => {
    // 调用 Spring Boot: POST /api/artworks
    return request('/artworks', {
        method: 'POST',
        body: JSON.stringify(artworkData)
    });
};