package com.graduation.controller;

import com.graduation.entity.Comments;
import com.graduation.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    // 假设你已经创建了 CommentRepository
    @Autowired
    private CommentRepository commentRepository;

    // 1. 获取所有评论列表
    @GetMapping
    public ResponseEntity<List<Comments>> getAllComments() {
        // 模拟数据 (实际应从数据库查询并关联用户和作品信息)
         List<Comments> comments = commentRepository.findAll();
         return ResponseEntity.ok(comments);

       // return ResponseEntity.ok(Collections.emptyList()); // 暂时返回空，依靠前端 mock 数据
    }

    // 2. 删除评论
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id) {
        commentRepository.deleteById(id);
        return ResponseEntity.ok(Collections.singletonMap("message", "删除成功"));
    }
}