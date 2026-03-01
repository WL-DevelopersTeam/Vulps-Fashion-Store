package com.example.backend.Common.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.http.HttpMethod;

@Configuration
public class SecurityConfig {

    @Autowired
private JwtFilter jwtFilter;

@Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

    http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .authorizeHttpRequests(auth -> auth


            .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

            .requestMatchers("/api/auth/signup").permitAll()
            .requestMatchers("/api/auth/signin").permitAll()
            .requestMatchers("/api/auth/refresh").permitAll()

            // Public GET only (view products)
            .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/products/**").permitAll()

            // ADMIN only for modifying products
            .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/products/**").hasRole("ADMIN")
            .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
            .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")

             // ===== LATEST COLLECTIONS =====

        // Public GET
        .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/latest-collections/**").permitAll()

        // ADMIN modify
        .requestMatchers(org.springframework.http.HttpMethod.POST, "/api/latest-collections/**").hasRole("ADMIN")
        .requestMatchers(org.springframework.http.HttpMethod.PUT, "/api/latest-collections/**").hasRole("ADMIN")
        .requestMatchers(org.springframework.http.HttpMethod.DELETE, "/api/latest-collections/**").hasRole("ADMIN")


        // ===== ORDERS =====

    // CUSTOMER place order
    .requestMatchers(HttpMethod.POST, "/api/orders").hasAnyRole("CUSTOMER", "ADMIN")

    // CUSTOMER view own orders
    .requestMatchers(HttpMethod.GET, "/api/orders/user/**").hasAnyRole("CUSTOMER", "ADMIN")

    // CUSTOMER cancel
    .requestMatchers(HttpMethod.PUT, "/api/orders/*/cancel").hasAnyRole("CUSTOMER", "ADMIN")

    // ADMIN only
    .requestMatchers(HttpMethod.GET, "/api/orders").hasRole("ADMIN")
    .requestMatchers(HttpMethod.PUT, "/api/orders/*/accept").hasRole("ADMIN")
    .requestMatchers(HttpMethod.PUT, "/api/orders/*/deliver").hasRole("ADMIN")
    .requestMatchers(HttpMethod.PUT, "/api/orders/*/decline").hasRole("ADMIN")
    .requestMatchers(HttpMethod.PUT, "/api/orders/*/ship").hasRole("ADMIN")

    .requestMatchers(HttpMethod.POST, "/api/orders/*/return").hasAnyRole("CUSTOMER", "ADMIN")
    .requestMatchers("/api/admin/**").hasRole("ADMIN")

            // Everything else needs login
            .anyRequest().authenticated()
        )
        .sessionManagement(session ->
            session.sessionCreationPolicy(
                    org.springframework.security.config.http.SessionCreationPolicy.STATELESS
            )
        )
        .addFilterBefore(jwtFilter,
                org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

    return http.build();
}


    @Bean
        public CorsConfigurationSource corsConfigurationSource() {

            CorsConfiguration config = new CorsConfiguration();

            config.setAllowCredentials(true);

            config.setAllowedOrigins(List.of(
                "https://clovra-fashion-store.netlify.app"
            ));

            config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
            ));

            config.setAllowedHeaders(List.of(
                "Authorization",
                "Content-Type",
                "X-Requested-With"
            ));

            config.setExposedHeaders(List.of(
                "Set-Cookie"
            ));

            UrlBasedCorsConfigurationSource source =
                    new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", config);

            return source;
        }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
