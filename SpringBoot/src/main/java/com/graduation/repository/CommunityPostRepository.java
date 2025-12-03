package com.graduation.repository;

import com.graduation.entity.CommunityPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// 社区文章仓库
@Repository
public interface CommunityPostRepository extends JpaRepository<CommunityPost, Long> {
    List<CommunityPost> findByTitleContaining(String keyword); // 标题模糊搜索
    List<CommunityPost> findByTagsContaining(String tag); // 标签搜索
}