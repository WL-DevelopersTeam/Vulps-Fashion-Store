package com.example.backend.customize.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.customize.dto.CustomizedProductRequest;
import com.example.backend.customize.dto.CustomizedProductResponse;
import com.example.backend.customize.service.CustomizedProductService;

@RestController
@RequestMapping("/api/custom-products")
@CrossOrigin
public class CustomizedProductController 
{
    @Autowired
    private CustomizedProductService service;

    // User submits form
    @PostMapping
    public void create(@RequestBody CustomizedProductRequest request) {
        service.create(request);
    }

    // Admin dashboard
    @GetMapping
    public List<CustomizedProductResponse> getAll() {
        return service.getAll();
    }
}
