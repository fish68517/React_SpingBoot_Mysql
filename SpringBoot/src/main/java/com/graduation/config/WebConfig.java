package com.graduation.config;

import com.graduation.TokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web配置类
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Value("${file.upload-dir:src/main/resources/static/image}")
    private String uploadDir;
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 映射 URL 路径 /images/** 到 本地文件系统目录 ./image/
        // "file:./image/" 指的是项目运行时的根目录下的 image 文件夹
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:./image/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")  // 实际部署时应当限制为特定域名
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }


/*    @Override
    public void addInterceptors(InterceptorRegistry registry) {
       *//* System.out.println("正在注册拦截器..."); // 启动项目时看看这句话打印了吗？

        registry.addInterceptor(tokenInterceptor)
                // 2. 【关键】你的请求是 /api/admin/...，所以必须确保路径能匹配上
                // 建议先用 "/**" 拦截所有请求来测试，确保拦截器生效，然后再缩小范围
                .addPathPatterns("/api/admin/**")

                // 3. 排除不需要登录的接口 (登录、注册、静态资源)
                .excludePathPatterns(
                        "/api/auth/login",
                        "/api/auth/register",
                        "/images/**",
                        "/error" // SpringBoot 的错误路径也要排除，不然报错时会二次拦截
                );*//*
    }*/

}