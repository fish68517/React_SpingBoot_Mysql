package com.graduation.dto;

// --- 作品相关 ---
import lombok.Data;
import java.time.LocalDateTime;
@Data
public class ArtworkDTO {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private String tags;
    private String authorName; // 只需要作者名字，不需要整个User对象
    private String authorAvatar;
    private Integer views;
    private Integer likes;
    private LocalDateTime createdAt;
}