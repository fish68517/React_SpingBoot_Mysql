package com.graduation.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api") // 基础路径
@CrossOrigin(origins = "*")
public class UploadController {

    // 简单的后端上传接口示例 (Java)
    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("文件不能为空");
        }

        try {
            // 1. 生成唯一文件名
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

            // 2. 获取当前项目的根目录 (绝对路径)
            // System.getProperty("user.dir") 会获取到你的项目根目录 D:\Acode\Android\...\SpringBoot
            String projectRootPath = System.getProperty("user.dir");

            // 3. 构建图片存储的目录对象
            File uploadDir = new File(projectRootPath, "image");

            // 【关键步骤】检查目录是否存在，不存在则创建！
            if (!uploadDir.exists()) {
                uploadDir.mkdirs(); // mkdirs 会自动创建多级目录
            }

            // 4. 构建完整的目标文件路径 (必须使用绝对路径)
            File dest = new File(uploadDir.getAbsolutePath() + File.separator + fileName);

            System.out.println("图片将保存到: " + dest.getAbsolutePath());

            // 5. 保存文件
            file.transferTo(dest);

            // 6. 返回文件名给前端
            return ResponseEntity.ok(fileName);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("文件上传失败: " + e.getMessage());
        }
    }

}
