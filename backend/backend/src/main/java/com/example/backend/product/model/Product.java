package com.example.backend.product.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private double price;

    private String category;

    private String imageUrl;

    @ElementCollection
    private List<String> sizes;

    @ElementCollection
    private List<String> colors;

    @Column(nullable = false)
    private Boolean active = true;
}
