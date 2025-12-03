package com.graduation.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "comments")
public class Comments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long artworkId;
    private Long postId;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User author; // 关联 User 实体

    private String content;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
