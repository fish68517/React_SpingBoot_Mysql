package com.graduation.controller;

import com.graduation.dto.ArtworkDTO;
import com.graduation.entity.Artwork;
import com.graduation.repository.ArtworkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api") // 基础路径
@CrossOrigin(origins = "*")
public class ArtworkController {

    @Autowired
    private ArtworkRepository artworkRepository;

    // --- 公共接口 ---

    // 获取所有已发布作品 (首页用)
    @GetMapping("/artworks")
    public List<ArtworkDTO> getAllArtworks() {
        return artworkRepository.findByStatusOrderByCreatedAtDesc(1) // status=1 表示已发布
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // --- 管理员接口 (Admin) ---

    // 1. 获取所有待审核作品
    @GetMapping("/admin/artworks/pending")
    public List<ArtworkDTO> getPendingArtworks() {
        return artworkRepository.findByStatusOrderByCreatedAtDesc(0) // status=0 表示待审核
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // 2. 审核通过
    @PostMapping("/admin/artworks/{id}/approve")
    public ResponseEntity<?> approveArtwork(@PathVariable Long id) {
        return artworkRepository.findById(id)
                .map(artwork -> {
                    artwork.setStatus(1);
                    artworkRepository.save(artwork);
                    // 修改点：返回一个简单的 JSON 对象，而不是 build()
                    return ResponseEntity.ok(java.util.Collections.singletonMap("message", "操作成功"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. 驳回作品
    @PostMapping("/admin/artworks/{id}/reject")
    public ResponseEntity<?> rejectArtwork(@PathVariable Long id) {
        return artworkRepository.findById(id)
                .map(artwork -> {
                    artwork.setStatus(2);
                    artworkRepository.save(artwork);
                    // 修改点：返回一个简单的 JSON 对象
                    return ResponseEntity.ok(java.util.Collections.singletonMap("message", "操作成功"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // --- 辅助方法 ---

    private ArtworkDTO convertToDTO(Artwork artwork) {
        ArtworkDTO dto = new ArtworkDTO();
        dto.setId(artwork.getId());
        dto.setTitle(artwork.getTitle());
        dto.setDescription(artwork.getDescription());
        dto.setImageUrl(artwork.getImageUrl());
        dto.setTags(artwork.getTags());
        dto.setViews(artwork.getViews());
        dto.setLikes(artwork.getLikes());
        dto.setCreatedAt(artwork.getCreatedAt());
        // 映射状态，方便前端显示
        // dto.setStatus(artwork.getStatus());

        if (artwork.getAuthor() != null) {
            dto.setAuthorName(artwork.getAuthor().getNickname());
            dto.setAuthorAvatar(artwork.getAuthor().getAvatar());
        }
        return dto;
    }
}
