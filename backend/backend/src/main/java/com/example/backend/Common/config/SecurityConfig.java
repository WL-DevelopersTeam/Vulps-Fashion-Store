package com.example.backend.Common.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .authorizeHttpRequests(auth -> auth

                // ✅ Allow OPTIONS requests (preflight)
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // ✅ Allow public APIs
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/products/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/cart/**").permitAll()
                .requestMatchers("/api/latest-collections/**").permitAll()

                // ✅ Allow images
                .requestMatchers("/images/**").permitAll()

                // 🔐 Everything else requires authentication
                .anyRequest().authenticated()
            );

        return http.build();
    }

   @Bean
public CorsConfigurationSource corsConfigurationSource() {

    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);

    config.setAllowedOriginPatterns(List.of(
        "https://vulpsfashionstore.vercel.app"
    ));

    config.setAllowedMethods(List.of(
        "GET", "POST", "PUT", "DELETE", "OPTIONS"
    ));

    config.setAllowedHeaders(List.of(
        "Authorization",
        "Content-Type",
        "Accept"
    ));

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);

    return source;
}


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
