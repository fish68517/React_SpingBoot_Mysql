package com.graduation.dto;
import lombok.Data;
import java.time.LocalDateTime;

// --- 社区文章相关 ---
@Data
public class CommunityPostDTO {
    private Long id;
    private String title;
    private String excerpt;
    private String content;
    private String[] tags; // 前端接收数组
    private String authorName;
    private LocalDateTime createdAt;
}
