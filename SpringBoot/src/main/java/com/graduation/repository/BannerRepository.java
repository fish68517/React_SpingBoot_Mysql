package com.graduation.repository;


import com.graduation.entity.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {

    // 前端轮播图只需查询启用的，按排序升序
    List<Banner> findByStatusOrderBySortOrderAsc(Integer status);
}