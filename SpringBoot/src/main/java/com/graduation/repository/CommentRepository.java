package com.graduation.repository;

import com.graduation.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Long> {

    // findByArtworkId
    java.util.List<Comments> findByArtworkId(Long artworkId);

    // findByPostId
    java.util.List<Comments> findByPostId(Long postId);
}
