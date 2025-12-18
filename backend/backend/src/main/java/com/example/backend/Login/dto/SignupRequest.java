package com.example.backend.Login.dto;

import lombok.Data;

@Data
public class SignupRequest 
{
    private String name;

    private String email;

    private String phonenumber;
    
    private String password;
    //private String role;
    private String confirmPassword;
    
}

