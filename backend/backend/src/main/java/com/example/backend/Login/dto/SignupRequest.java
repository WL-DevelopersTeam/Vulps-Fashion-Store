package com.example.backend.Login.dto;

import lombok.Data;

@Data
public class SignupRequest 
{
    private String email;
    private String name;
    private String password;
    private String role;
    private String confirmPassword;
}

