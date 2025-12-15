package com.graduation.service.impl;// src/main/java/com/yourpackage/service/impl/BannerServiceImpl.java

import com.graduation.dto.BannerCreateDTO;
import com.graduation.dto.BannerDTO;
import com.graduation.entity.Banner;
import com.graduation.repository.BannerRepository;
import com.graduation.service.BannerService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BannerServiceImpl implements BannerService {

    @Autowired
    private BannerRepository bannerRepository;

    @Override
    public List<BannerDTO> getActiveBanners() {
        return bannerRepository.findByStatusOrderBySortOrderAsc(1)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<BannerDTO> getAllBanners() {
        return bannerRepository.findAll()
                .stream()
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public BannerDTO createBanner(BannerCreateDTO dto) {
        Banner banner = new Banner();
        BeanUtils.copyProperties(dto, banner);
        banner.setCreatedAt(LocalDateTime.now());
        banner.setUpdatedAt(LocalDateTime.now());
        banner = bannerRepository.save(banner);
        return convertToDTO(banner);
    }

    @Override
    public BannerDTO updateBanner(Long id, BannerCreateDTO dto) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Banner not found"));
        BeanUtils.copyProperties(dto, banner);
        banner.setUpdatedAt(LocalDateTime.now());
        banner = bannerRepository.save(banner);
        return convertToDTO(banner);
    }

    @Override
    public void deleteBanner(Long id) {
        bannerRepository.deleteById(id);
        // TODO: 可选：同时删除服务器上的图片文件
    }

    private BannerDTO convertToDTO(Banner banner) {
        BannerDTO dto = new BannerDTO();
        BeanUtils.copyProperties(banner, dto);
        return dto;
    }
}