package com.graduation.controller;

import com.graduation.dto.CommunityPostDTO;
import com.graduation.entity.CommunityPost;
import com.graduation.entity.User;
import com.graduation.repository.CommunityPostRepository;
import com.graduation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

// ==========================================
// 3. 社区控制器 (CommunityController)
// ==========================================
@RestController
@RequestMapping("/api/community")
@CrossOrigin(origins = "*")
public class CommunityController {

    @Autowired
    private CommunityPostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    // 获取文章列表 (支持搜索)
    @GetMapping("/posts")
    public List<CommunityPostDTO> getPosts(@RequestParam(required = false) String search) {
        List<CommunityPost> posts;
        if (search != null && !search.isEmpty()) {
            posts = postRepository.findByTitleContaining(search);
        } else {
            posts = postRepository.findAll();
        }
        return posts.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    // 发布新文章
/*    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@RequestBody CommunityPostDTO postDTO) {
        // 模拟：假设当前用户ID为1 (实际应从Token获取)
        User author = userRepository.findById(1L).orElseThrow();

        CommunityPost post = new CommunityPost();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setExcerpt(postDTO.getExcerpt());
        // 将前端传来的数组转换为逗号分隔字符串
        if (postDTO.getTags() != null) {
            post.setTags(String.join(",", postDTO.getTags()));
        }
        post.setAuthor(author);

        CommunityPost savedPost = postRepository.save(post);
        return ResponseEntity.ok(convertToDTO(savedPost));
    }*/


    // 1. 获取文章列表
/*    @GetMapping("/posts")
    public List<CommunityPostDTO> getPosts() {
        //按创建时间倒序
        // 实际项目中可以在 Repository 定义 findAllByOrderByCreatedAtDesc()
        List<CommunityPost> posts = postRepository.findAll();
        return posts.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }*/

    // 2. 发布新文章
    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@RequestBody CommunityPostDTO postDTO) {
        // 模拟：固定使用 ID 为 1 的用户作为作者 (实际应从 Token 解析当前用户)
        // 请确保数据库 users 表里有 id=1 的用户
        User author = userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("默认用户不存在，请检查数据库"));

        CommunityPost post = new CommunityPost();
        post.setTitle(postDTO.getTitle());
        post.setContent(postDTO.getContent());
        post.setExcerpt(postDTO.getExcerpt());

        // 将前端的标签数组转换为逗号分隔字符串存入数据库
        if (postDTO.getTags() != null && postDTO.getTags().length > 0) {
            post.setTags(String.join(",", postDTO.getTags()));
        }

        post.setAuthor(author);

        CommunityPost savedPost = postRepository.save(post);
        return ResponseEntity.ok(convertToDTO(savedPost));
    }

    // DTO 转换工具方法
    private CommunityPostDTO convertToDTO(CommunityPost post) {
        CommunityPostDTO dto = new CommunityPostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setExcerpt(post.getExcerpt());
        dto.setContent(post.getContent());

        // 数据库字符串 -> 前端数组
        if (post.getTags() != null && !post.getTags().isEmpty()) {
            dto.setTags(post.getTags().split(","));
        } else {
            dto.setTags(new String[0]);
        }

        // 格式化日期 LocalDateTime -> String (yyyy-MM-dd)
        if (post.getCreatedAt() != null) {
            dto.setDate(post.getCreatedAt().toLocalDate().toString());
        }

        if (post.getAuthor() != null) {
            dto.setAuthor(post.getAuthor().getNickname()); // 前端显示的是 nickname
        }
        return dto;
    }
}
