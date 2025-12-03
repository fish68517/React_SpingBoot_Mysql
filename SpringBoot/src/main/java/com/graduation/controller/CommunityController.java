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
    @PostMapping("/posts")
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
    }

    private CommunityPostDTO convertToDTO(CommunityPost post) {
        CommunityPostDTO dto = new CommunityPostDTO();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setExcerpt(post.getExcerpt());
        dto.setContent(post.getContent());
        if (post.getTags() != null) {
            dto.setTags(post.getTags().split(","));
        }
        dto.setCreatedAt(post.getCreatedAt());
        if (post.getAuthor() != null) {
            dto.setAuthorName(post.getAuthor().getNickname());
        }
        return dto;
    }
}
