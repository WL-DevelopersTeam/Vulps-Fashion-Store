package com.example.backend.Login.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import com.example.backend.Common.config.JwtUtil;
import com.example.backend.Login.dto.SigninRequest;
import com.example.backend.Login.dto.SignupRequest;
import com.example.backend.Login.service.AuthService;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "https://clovra-fashion-store.netlify.app",
        "http://localhost:3000",
        "http://localhost:5173"
})
public class AuthController {

    @Autowired
    private AuthService authService;

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public AuthController(JwtUtil jwtUtil,
                          UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) {
        return authService.signup(request);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody SigninRequest request,
                                    HttpServletResponse response) {

        Map<String, Object> authResponse = authService.signin(request);

        String userId = String.valueOf(authResponse.get("userId"));
        String role = (String) authResponse.get("role");

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(userId);

        String accessToken =
                jwtUtil.generateAccessToken(userDetails, role);

        String refreshToken =
                jwtUtil.generateRefreshToken(userDetails);

        ResponseCookie accessCookie = ResponseCookie.from("accessToken", accessToken)
                .httpOnly(true)
                .secure(true)        // ✅ Production
                .sameSite("None")    // ✅ Production
                .path("/")
                .maxAge(15 * 60)
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true)        // ✅ Production
                .sameSite("None")    // ✅ Production
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(
            @CookieValue(name = "refreshToken", required = false) String refreshToken,
            HttpServletResponse response) {

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            Claims claims = jwtUtil.validateToken(refreshToken);

            if (!"refresh".equals(claims.get("type", String.class))) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            String username = claims.getSubject();
            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            String role = userDetails.getAuthorities()
                    .iterator()
                    .next()
                    .getAuthority()
                    .replace("ROLE_", "");

            String newAccessToken =
                    jwtUtil.generateAccessToken(userDetails, role);

            ResponseCookie accessCookie =
                    ResponseCookie.from("accessToken", newAccessToken)
                            .httpOnly(true)
                            .secure(true)      // ✅ Production
                            .sameSite("None")  // ✅ Production
                            .path("/")
                            .maxAge(15 * 60)
                            .build();

            response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

            return ResponseEntity.ok("Token refreshed");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}