/**
 * 图片加载工具类
 */

// 1. 定义后端服务器地址 (建议从环境变量读取，这里先写死用于测试)
// 如果你的 SpringBoot 端口是 8080
// src/utils/imageUtils.js

// Vite 的环境变量写法
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 2. 定义后端映射的静态资源路径前缀
// 这意味着你需要访问 http://localhost:8080/images/xxx.jpg
const IMAGE_PREFIX = '/images/'; 

/**
 * 获取完整的图片 URL
 * @param {string} path - 后端返回的图片路径或文件名 (例如 "cat.jpg" 或 "/cat.jpg")
 * @returns {string} - 可访问的绝对 URL
 */
export const getImageUrl = (path) => {
  if (!path) {
    // 如果没有图片，返回一个默认占位图
    return 'https://via.placeholder.com/400x300?text=No+Image';
  }

  // 如果已经是网络图片 (http开头) 或 Base64 (data:开头)，直接返回
  if (path.startsWith('http') || path.startsWith('data:')) {
    console.log("正在访问图片:", path);
    return path;
  }

  // 清理路径中的多余斜杠
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;

  // 拼接完整地址: http://localhost:8080/images/cat.jpg
  return `${API_BASE_URL}${IMAGE_PREFIX}${cleanPath}`;
};