package com.graduation.controller;// src/main/java/com/yourpackage/controller/BannerController.java

import com.graduation.dto.BannerCreateDTO;
import com.graduation.dto.BannerDTO;
import com.graduation.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/banners")
@CrossOrigin(origins = "*")  // 根据需要调整跨域
public class BannerController {

    @Autowired
    private BannerService bannerService;

    // 前端首页轮播图调用（只需返回启用的）
    @GetMapping
    public ResponseEntity<List<BannerDTO>> getActiveBanners() {

        List<BannerDTO> banners = bannerService.getAllBanners();
        System.out.println("banners = " + banners);
        // 过滤 禁用的  status = 0
       // banners.stream().filter(banner -> banner.getStatus() == 1);


        // 为什么这里不能过滤走 status = 0 的数据
        banners = banners.stream().filter(banner -> banner.getStatus() == 1).collect(Collectors.toList());
        System.out.println("banners00 = " + banners);
        return ResponseEntity.ok(banners);


    }

    // 后台管理：获取所有
    @GetMapping("/admin/all")
    public ResponseEntity<List<BannerDTO>> getAllBanners() {
        return ResponseEntity.ok(bannerService.getActiveBanners());
    }

    // 新增
    @PostMapping
    public ResponseEntity<BannerDTO> createBanner( @RequestBody BannerCreateDTO dto) {
        return ResponseEntity.ok(bannerService.createBanner(dto));
    }

    // 更新
    @PutMapping("/{id}")
    public ResponseEntity<BannerDTO> updateBanner(@PathVariable Long id,
                                                   @RequestBody BannerCreateDTO dto) {
        return ResponseEntity.ok(bannerService.updateBanner(id, dto));
    }

    // 删除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBanner(@PathVariable Long id) {
        bannerService.deleteBanner(id);
        return ResponseEntity.noContent().build();
    }
}