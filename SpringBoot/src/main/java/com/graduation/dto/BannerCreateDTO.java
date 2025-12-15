package com.graduation.dto;// src/main/java/com/yourpackage/dto/BannerCreateDTO.java（新增/更新用）


import lombok.Data;

@Data
public class BannerCreateDTO {
    private String title;

    private String content;


    private String imageUrl;       // 上传成功后传入文件名

    private Integer status = 1;

    private Integer sortOrder = 0;
}