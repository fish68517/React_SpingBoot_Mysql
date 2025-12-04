package com.graduation.repository;

import com.graduation.entity.Artwork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// 作品仓库
@Repository
public interface ArtworkRepository extends JpaRepository<Artwork, Long> {
    List<Artwork> findByStatusOrderByCreatedAtDesc(Integer status); // 查询已发布作品，按时间倒序
    List<Artwork> findByAuthorId(Long userId); // 查询某人的作品

    // 获取待审核的作品
    List<Artwork> findByStatus(Integer status);
}