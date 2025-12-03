package com.graduation.controller;

import com.graduation.dto.AuthResponse;
import com.graduation.dto.LoginRequest;
import com.graduation.dto.RegisterRequest;
import com.graduation.dto.UserDTO;
import com.graduation.entity.User;
import com.graduation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

// ==========================================
// 1. 认证控制器 (AuthController)
// ==========================================
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // 允许跨域
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 模拟登录逻辑：实际项目中应使用 Spring Security + JWT
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 简单密码比对 (实际应使用 BCryptPasswordEncoder)
        // if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) ...

        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setNickname(user.getNickname());
        userDTO.setAvatar(user.getAvatar());
        userDTO.setRole(user.getRole());

        AuthResponse response = new AuthResponse();
        response.setToken("mock-jwt-token-" + user.getId()); // 模拟 Token
        response.setUser(userDTO);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body("用户名已存在");
        }
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setPassword(registerRequest.getPassword()); // 实际应加密
        user.setRole("USER");
        user.setNickname("新用户");
        userRepository.save(user);
        return ResponseEntity.ok("注册成功");
    }
}