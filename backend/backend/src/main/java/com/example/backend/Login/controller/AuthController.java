package com.example.backend.Login.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Login.dto.SigninRequest;
import com.example.backend.Login.dto.SignupRequest;
import com.example.backend.Login.service.AuthService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

// import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.ResponseCookie;
import java.time.Duration;

@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://clovra-fashion-store.netlify.app",
    "http://localhost:5173"
})
@RestController
@RequestMapping("/api/auth")
public class AuthController 
{
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequest request) 
    {
        return authService.signup(request);
    }

    @PostMapping("/signin")
        public ResponseEntity<?> signin(@RequestBody SigninRequest request,HttpServletResponse response)     
        {

            Map<String, Object> authResponse = authService.signin(request);

            String token = (String) authResponse.get("token");

            // 🔥 Create HttpOnly Cookie
            ResponseCookie cookie = ResponseCookie.from("accessToken", token)
                    .httpOnly(true)          // JS cannot access
                    .secure(true)            // true in production (HTTPS)
                    .path("/")
                    .maxAge(Duration.ofMinutes(15))   // change from 1 day to 15 mins
                    .sameSite("Strict")
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            // 🔥 Remove token from JSON response
            authResponse.remove("token");

            return ResponseEntity.ok(authResponse);
        }  
    
    
} 
