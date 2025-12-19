package com.example.backend.Login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Login.dto.SigninRequest;
import com.example.backend.Login.dto.SignupRequest;
import com.example.backend.Login.service.AuthService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin(origins = "*")
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
    public String signin(@RequestBody SigninRequest request) {
       
        
        return authService.signin(request);
    }
    
    
} 
