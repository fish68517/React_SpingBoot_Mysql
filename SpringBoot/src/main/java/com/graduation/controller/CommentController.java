package com.graduation.controller;

import com.graduation.entity.Comments;
import com.graduation.entity.User;
import com.graduation.repository.CommentRepository;
import com.graduation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    // 假设你已经创建了 CommentRepository
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    // 1. 获取所有评论列表
    @GetMapping
    public ResponseEntity<List<Comments>> getAllComments() {
        // 模拟数据 (实际应从数据库查询并关联用户和作品信息)
         List<Comments> comments = commentRepository.findAll();
         return ResponseEntity.ok(comments);

       // return ResponseEntity.ok(Collections.emptyList()); // 暂时返回空，依靠前端 mock 数据
    }

    // 根据 post_id 获取评论详情列表
    @GetMapping("/artwork/{artworkId}")
    public ResponseEntity<List<Comments>> getCommentsByArtworkId(@PathVariable Long artworkId) {
        List<Comments> comments = commentRepository.findByArtworkId(artworkId);
        return ResponseEntity.ok(comments);
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comments>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comments> comments = commentRepository.findByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    // 3. 添加评论
    @PostMapping
    public ResponseEntity<Comments> addComment(@RequestBody Comments comment) {
        Comments savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }

    // 能否获取用户登录 id
    @PostMapping("/post/{postId}/{userId}")
    public ResponseEntity<Comments> addCommentByPostId(@PathVariable Long postId, @PathVariable Long userId,@RequestBody Comments comment) {
        System.out.println("当前登录用户： "+userId);
        Optional <User> user =userRepository.findById(userId);
        comment.setAuthor(user.orElseThrow());
        comment.setPostId(postId);
        comment.setArtworkId(1L);
        Comments savedComment = commentRepository.save(comment);
        return ResponseEntity.ok(savedComment);
    }

    // 2. 删除评论
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return ResponseEntity.ok(Collections.singletonMap("message", "删除成功"));
    }
}