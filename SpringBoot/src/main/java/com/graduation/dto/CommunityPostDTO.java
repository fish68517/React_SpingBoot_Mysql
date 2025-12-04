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
    private String[] tags; // 前端传数组，后端也用数组接收
    private String author; // 对应前端的 author 字段 (作者昵称)
    private String date;   // 对应前端的 date 字段 (格式化后的日期字符串)

    // 接收参数时可能用到的字段
    private Long authorId;
}
