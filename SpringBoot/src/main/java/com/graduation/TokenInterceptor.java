package com.graduation;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("Authorization");

        System.out.println("Token: " + token);
        // 简单的 Token 格式处理 (通常前端会发 "Bearer xxxxx")
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        if (token != null) {
            try {
                // 1. 解析 Token
                Claims claims = JwtUtil.parseToken(token);

                // 2. 从 Claims 中取出登录时存进去的 id
                // 注意：JWT 解析出来的数字可能是 Integer，安全起见转一下 Long
                Long userId = claims.get("userId", Long.class);

                // 3. 【存入 Request】这样 Controller 才能通过 @RequestAttribute("id") 拿到
                request.setAttribute("userId", userId);

                return true; // 放行
            } catch (Exception e) {
                // Token 过期或无效
                System.out.println("Token 解析失败: " + e.getMessage());
            }
        }

        response.setStatus(401); // 未授权
        return false;
    }
}