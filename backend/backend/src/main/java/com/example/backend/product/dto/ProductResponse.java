package com.example.backend.product.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProductResponse 
{
    private Long id;
    
    private String name;

    private String description;

    private double price;

    private String category;
    
    private List<String> sizes;   

    private List<String> colors;

    private String imageUrl;

}
