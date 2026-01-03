package com.example.backend.product.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.product.dto.ProductRequest;
import com.example.backend.product.dto.ProductResponse;
import com.example.backend.product.service.ProductService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/products")
public class ProductController 
{
    @Autowired
    private ProductService productService;

    // Admin adds product 
    @PostMapping(consumes = "multipart/form-data")
public ProductResponse addProduct(
    @RequestParam String name,
    @RequestParam String description,
    @RequestParam double price,
    @RequestParam String category,
    @RequestParam MultipartFile image,
    @RequestParam(required = false) List<String> sizes,
    @RequestParam(required = false) List<String> colors

) throws IOException {

         ProductRequest request = new ProductRequest();
        request.setName(name);
        request.setDescription(description);
        request.setPrice(price);
        request.setCategory(category);
        request.setImage(image);
        request.setSizes(sizes);
        request.setColors(colors);

        return productService.addProduct(request);
    }

    // Get all products
    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    // Get by category
    @GetMapping("/category/{category}")
    public List<ProductResponse> getProductsByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    // Get by size
    @GetMapping("/size/{size}")
    public List<ProductResponse> getBySize(@PathVariable String size) {
        return productService.getProductsBySize(size);
    }

    // Get by color
    @GetMapping("/color/{color}")
    public List<ProductResponse> getByColor(@PathVariable String color) {
        return productService.getProductsByColor(color);
    }
    
}
