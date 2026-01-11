package com.example.backend.product.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ProductRequest {

    private String name;
    private String description;
    private double price;
    private String category;

    private MultipartFile image;

    private List<String> sizes;
    private List<String> colors;
}
