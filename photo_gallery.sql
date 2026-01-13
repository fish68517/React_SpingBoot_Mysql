/*
 Navicat Premium Dump SQL

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 80036 (8.0.36)
 Source Host           : localhost:3306
 Source Schema         : photo_gallery

 Target Server Type    : MySQL
 Target Server Version : 80036 (8.0.36)
 File Encoding         : 65001

 Date: 13/01/2026 16:06:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for artworks
-- ----------------------------
DROP TABLE IF EXISTS `artworks`;
CREATE TABLE `artworks`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint NOT NULL COMMENT '作者ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '作品标题',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '作品描述/创作思路',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '图片URL(OSS地址)',
  `model_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '3D模型URL(可选)',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签，逗号分隔',
  `width` int NULL DEFAULT NULL COMMENT '图片宽',
  `height` int NULL DEFAULT NULL COMMENT '图片高',
  `views` int NULL DEFAULT 0 COMMENT '浏览量',
  `likes` int NULL DEFAULT 0 COMMENT '点赞数',
  `status` int NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `artworks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '摄影作品表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of artworks
-- ----------------------------
INSERT INTO `artworks` VALUES (1, 1, '城市之光', '记录繁华都市的夜景，使用长曝光拍摄。', 'Lights.jpg', NULL, '夜景,建筑', NULL, NULL, 102, 45, 1, '2025-12-03 21:01:17');
INSERT INTO `artworks` VALUES (2, 2, '静谧森林', '清晨的第一缕阳光穿过树林。', 'Forest.jpg', NULL, '自然,风光', NULL, NULL, 89, 32, 2, '2025-12-03 21:01:17');
INSERT INTO `artworks` VALUES (3, 3, '星空下的轨迹', '在内蒙古草原拍摄的星轨。', 'Trails.jpg', NULL, '星空,长曝光', NULL, NULL, 210, 150, 0, '2025-12-03 21:01:17');
INSERT INTO `artworks` VALUES (4, 1, '海的呼吸', '慢门拍摄海浪的拉丝效果。', 'Breath.jpg', NULL, '大海,慢门', NULL, NULL, 56, 12, 1, '2025-12-03 21:01:17');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '轮播图标题',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '轮播图描述内容',
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片URL或文件名，例如：banner1.jpg',
  `status` tinyint NOT NULL DEFAULT 1,
  `sort_order` int NOT NULL DEFAULT 0 COMMENT '排序值，越小越靠前',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '轮播图表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (2, '年度优秀作品展', '精选艺术家作品欣赏', 'banner2.jpg', 1, 2, '2025-12-15 09:35:42', '2025-12-15 09:35:42');
INSERT INTO `banner` VALUES (3, '新锐艺术家推荐', '年轻创作者的无限可能', 'banner4.jpg', 0, 3, '2025-12-15 09:35:42', '2025-12-15 11:06:29');
INSERT INTO `banner` VALUES (4, '东京', '东京东京东京东京东京东京', '1765768223997_e965f3cd8b8778c9da845f61279aafde.jpeg', 1, 3, '2025-12-15 11:07:11', '2025-12-15 11:10:24');
INSERT INTO `banner` VALUES (5, '分析图', '分析图分析图分析图分析图分析图', '1765768248189_echarts.png', 1, 4, '2025-12-15 11:10:48', '2025-12-15 11:10:48');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint NOT NULL COMMENT '评论者ID',
  `artwork_id` bigint NULL DEFAULT NULL COMMENT '关联作品ID',
  `post_id` bigint NULL DEFAULT NULL COMMENT '关联文章ID',
  `content` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '评论内容',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '评论表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 2, 1, 1, '光影控制得非常好，很有质感！', '2025-12-03 21:01:17');
INSERT INTO `comments` VALUES (2, 3, 1, 1, '请问是用什么镜头拍摄的？', '2025-12-03 21:01:17');
INSERT INTO `comments` VALUES (3, 1, 1, 1, '0000', NULL);

-- ----------------------------
-- Table structure for community_posts
-- ----------------------------
DROP TABLE IF EXISTS `community_posts`;
CREATE TABLE `community_posts`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint NOT NULL COMMENT '作者ID',
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `excerpt` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文章摘要',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章正文(Markdown或HTML)',
  `tags` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签，逗号分隔，如: 人像,后期',
  `views` int NULL DEFAULT 0 COMMENT '阅读量',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `community_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '技巧社区文章表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of community_posts
-- ----------------------------
INSERT INTO `community_posts` VALUES (1, 1, '人像摄影入门：如何用好自然光', '自然光是人像摄影的灵魂。本文将详细介绍如何在不同天气和时段，利用自然光拍出通透、有质感的人像照片...', '正文内容：自然光摄影的核心在于...', '人像摄影,用光技巧', 0, '2025-12-03 21:01:17');
INSERT INTO `community_posts` VALUES (2, 2, '风光后期处理：RAW格式调色全流程', '从RAW文件的基础调整到色彩分离、锐化输出，一步步教你如何将一张平淡的风光照变得震撼人心...', '正文内容：打开Lightroom...', '风光后期,Photoshop', 0, '2025-12-03 21:01:17');
INSERT INTO `community_posts` VALUES (3, 3, '街头摄影的构图法则', '决定性瞬间、框架式构图、引导线... 掌握这些经典的街头摄影构图技巧，让你的作品更具故事感。', '正文内容：构图决定了照片的骨架...', '街头摄影,构图', 0, '2025-12-03 21:01:17');
INSERT INTO `community_posts` VALUES (4, 1, '利用引导线构图', '利用引导线构图利用引导线构图利用引导线构图利用引导线构图利用引导线构图...', '利用引导线构图利用引导线构图利用引导线构图利用引导线构图利用引导线构图', '风光后期', 0, '2025-12-04 10:43:33');
INSERT INTO `community_posts` VALUES (5, 1, '如何手机摄像', '如何手机摄像如何手机摄像如何手机摄像如何手机摄像如何手机摄像...', '如何手机摄像如何手机摄像如何手机摄像如何手机摄像如何手机摄像', '手机摄影', 0, '2025-12-04 10:49:03');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码(加密存储)',
  `nickname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像URL',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'USER' COMMENT '角色: USER-普通用户, ADMIN-管理员',
  `created_at` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'zhangyu', '123456', '张宇', 'https://placehold.co/150x150/555555/ffffff?text=Zhang', NULL, 'USER', '2025-12-03 21:01:16');
INSERT INTO `users` VALUES (2, 'teacherZhou', '123456', '周老师', 'https://placehold.co/150x150/555555/ffffff?text=Zhou', NULL, 'ADMIN', '2025-12-03 21:01:16');
INSERT INTO `users` VALUES (3, 'ai_photographer', '123456', 'AI 摄影师', 'https://placehold.co/150x150/555555/ffffff?text=AI', NULL, 'USER', '2025-12-03 21:01:16');
INSERT INTO `users` VALUES (4, 'zhangsan', '123456', 'zhangsan', NULL, 'zhangsan@qq.com', 'USER', '2025-12-03 21:57:40');
INSERT INTO `users` VALUES (5, '小鱼', '123456', '新用户', NULL, NULL, 'USER', '2025-12-04 09:12:51');
INSERT INTO `users` VALUES (6, '小鱼2', '123456', '新用户', NULL, NULL, 'USER', '2025-12-04 09:19:31');
INSERT INTO `users` VALUES (7, '小鱼3', '123456', '新用户', NULL, NULL, 'USER', '2025-12-04 09:20:07');

SET FOREIGN_KEY_CHECKS = 1;
