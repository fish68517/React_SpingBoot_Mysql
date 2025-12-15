package com.graduation.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "banner")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String title;        // 可为空

    @Column(length = 255)
    private String content;      // 可为空

    @Column(nullable = false, length = 255,name = "image_url")
    private String imageUrl;        // 图片文件名，如 banner1.jpg

    @Column(nullable = false, columnDefinition = "TINYINT default 1")
    private Integer status = 1;  // 1=启用，0=禁用

    @Column(name = "sort_order", nullable = false)
    private Integer sortOrder = 0;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}