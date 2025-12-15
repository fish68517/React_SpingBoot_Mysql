package com.graduation.service;// src/main/java/com/yourpackage/service/BannerService.java


import com.graduation.dto.BannerCreateDTO;
import com.graduation.dto.BannerDTO;

import java.util.List;

public interface BannerService {
    List<BannerDTO> getActiveBanners();                // 前端轮播图调用
    List<BannerDTO> getAllBanners();                   // 后台管理列表
    BannerDTO createBanner(BannerCreateDTO dto);
    BannerDTO updateBanner(Long id, BannerCreateDTO dto);
    void deleteBanner(Long id);
}