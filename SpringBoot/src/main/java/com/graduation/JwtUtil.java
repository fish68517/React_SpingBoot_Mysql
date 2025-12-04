package com.graduation;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // 1. 定义一个足够长的密钥 (超过 32 个字符)，防止报错
    // 这里的字符串随便写，但必须够长
    private static final String SECRET_STRING = "MySuperSecretKey_For_Graduation_Project_2025_!@#_LongString";

    // 2. 将字符串转换为 JJWT 0.11.5 需要的 Key 对象
    private static final Key KEY = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));

    // 生成 Token
    public static String generateToken(Long userId, String username) {
        return Jwts.builder()
                .setSubject(username)
                .claim("id", userId) // 把 userId 存进去
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10小时过期
                .signWith(KEY, SignatureAlgorithm.HS256) // 0.11.5 写法：先传 Key，再传算法
                .compact();
    }

    // 解析 Token
    public static Claims parseToken(String token) {
        return Jwts.parserBuilder() // 0.11.5 写法：使用 parserBuilder
                .setSigningKey(KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}