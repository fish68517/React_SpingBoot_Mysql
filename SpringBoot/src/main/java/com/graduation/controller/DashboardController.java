package com.graduation.controller;

import com.graduation.entity.Artwork;
import com.graduation.repository.ArtworkRepository;
import com.graduation.repository.CommentRepository;
import com.graduation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArtworkRepository artworkRepository;

    // 假设你有一个 CommentRepository
    @Autowired
    private CommentRepository commentRepository;

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // 1. 基础计数
        long totalUsers = userRepository.count();
        long totalArtworks = artworkRepository.count();
        long totalComments = commentRepository.count();


        List<Artwork> pendingArtworks = artworkRepository.findByStatus(0);
        long pendingArtworksNum = pendingArtworks == null ? 0 : pendingArtworks.size();

        stats.put("totalUsers", totalUsers);
        stats.put("totalArtworks", totalArtworks);
        stats.put("totalComments", totalComments);
        stats.put("pendingArtworks", pendingArtworksNum);

        // 3. 模拟图表数据 (例如最近7天的访问量)
        int[] weeklyVisits = {120, 132, 101, 134, 90, 230, 210};
        // 假设 weeklyVisits 是一个数组，包含最近7天的访问量 并且每次1个小时随机一次
        Long timeStamp = System.currentTimeMillis();
        Long duration = 60 * 60 * 1000L; // 7天的毫秒数


       /* for (int i = 0; i < weeklyVisits.length; i++) {
            weeklyVisits[i] = (int) (Math.random() * 100);
        }*/
        stats.put("weeklyVisits", weeklyVisits);

        return stats;
    }
}