package com.example.backend.Common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})
        .authorizeHttpRequests(auth -> auth
            // ✅ ALLOW CORS PREFLIGHT
            .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()

            // ✅ PUBLIC APIs
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/products/**").permitAll()
            .requestMatchers("/api/cart/**").permitAll()
            .requestMatchers("/api/custom-products/**").permitAll()
            .requestMatchers("/api/latest-collections/**").permitAll()
            .requestMatchers("/images/**").permitAll()

            .anyRequest().authenticated()
        );

    return http.build();
}


    // 🔥 THIS IS THE MOST IMPORTANT PART
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(
            "/images/**",
            "/css/**",
            "/js/**"
        );
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
