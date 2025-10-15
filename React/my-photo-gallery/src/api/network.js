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
    return response.json();
  } catch (error) {
    console.error('API 请求出错:', error);
    throw error; // 将错误继续向上抛出，以便组件可以捕获
  }
}

// --- 以下是具体的 API 请求函数 ---

// 获取作品列表
export const getArtworks = () => {
  // 模拟数据，直到后端接口完成
  console.log("正在请求作品列表...");
  return Promise.resolve([
    { id: 1, title: '城市之光', author: '张宇', imageUrl: 'https://placehold.co/600x400/232323/ffffff?text=City+Lights' },
    { id: 2, title: '静谧森林', author: '周艳秋', imageUrl: 'https://placehold.co/600x800/2a2a2a/ffffff?text=Quiet+Forest' },
  ]);
  // return request('/artworks'); // 真实接口
};

// 用户登录
export const loginUser = (credentials) => {
  console.log("正在登录:", credentials);
  // 模拟登录成功
  return Promise.resolve({ token: 'fake-jwt-token', user: { name: '张宇' } });
  /*
  return request('/auth/login', { // 真实接口
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  */
};

// 用户注册
export const registerUser = (userInfo) => {
    console.log("正在注册:", userInfo);
    // 模拟注册成功
    return Promise.resolve({ message: '注册成功', user: { name: userInfo.username } });
  /*
  return request('/auth/register', { // 真实接口
    method: 'POST',
    body: JSON.stringify(userInfo),
  });
  */
};