package com.graduation.dto;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
}
