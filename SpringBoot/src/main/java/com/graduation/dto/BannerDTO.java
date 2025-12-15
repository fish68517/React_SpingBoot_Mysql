package com.graduation.dto;

import lombok.Data;

@Data
public class BannerDTO {
    private Long id;
    private String title;
    private String content;
    private String imageUrl;       // 只返回文件名，前端拼接完整路径
    private Integer status;
    private Integer sortOrder;

    @Override
    public String toString() {
        return "BannerDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", status=" + status +
                ", sortOrder=" + sortOrder +
                '}';
    }
}