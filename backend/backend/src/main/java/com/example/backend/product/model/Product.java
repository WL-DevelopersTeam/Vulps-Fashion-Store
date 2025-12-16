package com.example.backend.product.model;

import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Data;

@Entity
@Data
public class Product 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private double price;

    private String imageUrl; // store image URL

    private String category; // e.g., Men, Women, Accessories

    @ElementCollection
    @CollectionTable(
        name = "product_sizes",
        joinColumns = @JoinColumn(name = "product_id")
    )
    @Column(name = "size")
    private List<String> sizes;

    @ElementCollection
    @CollectionTable(
        name = "product_colors",
        joinColumns = @JoinColumn(name = "product_id")
    )
    @Column(name = "color")
    private List<String> colors;
    
}
