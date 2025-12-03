package com.graduation.entity;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

// 2. 作品实体
@Data
@Entity
@Table(name = "artworks")
public class Artwork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User author; // 关联 User 实体

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String imageUrl;
    private String modelUrl; // 3D模型
    private String tags; // 存储为逗号分隔字符串

    private Integer views = 0;
    private Integer likes = 0;
    private Integer status = 1; // 1:已发布

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

