package com.example.backend.product.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.backend.product.dto.ProductRequest;
import com.example.backend.product.dto.ProductResponse;
import com.example.backend.product.model.Product;
import com.example.backend.product.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private Cloudinary cloudinary;

    // ✅ ADD PRODUCT
    public ProductResponse addProduct(ProductRequest request) throws IOException {

        MultipartFile image = request.getImage();

        Map uploadResult = cloudinary.uploader().upload(
                image.getBytes(),
                Map.of("folder", "fashion-store/products")
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setSizes(request.getSizes());
        product.setColors(request.getColors());
        product.setImageUrl(imageUrl);

        productRepository.save(product);

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                imageUrl,
                product.getSizes(),
                product.getColors(),
                product.getCategory()
        );
    }

    // ✅ GET ALL
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getSizes(),
                        p.getColors(),
                        p.getCategory()
                ))
                .collect(Collectors.toList());
    }

    // ✅ GET BY CATEGORY
    public List<ProductResponse> getProductsByCategory(String category) {
        return productRepository.findByCategory(category)
                .stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getSizes(),
                        p.getColors(),
                        p.getCategory()
                ))
                .collect(Collectors.toList());
    }

    // ✅ GET BY SIZE
    public List<ProductResponse> getProductsBySize(String size) {
        return productRepository.findBySizesContaining(size)
                .stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getSizes(),
                        p.getColors(),
                        p.getCategory()
                ))
                .toList();
    }

    // ✅ GET BY COLOR
    public List<ProductResponse> getProductsByColor(String color) {
        return productRepository.findByColorsContaining(color)
                .stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getSizes(),
                        p.getColors(),
                        p.getCategory()
                ))
                .toList();
    }

    // ✅ Fetch product by ID
    public ProductResponse getProductById(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getImageUrl(),
                product.getColors(),
                product.getSizes(),
                product.getCategory()
        );
    }
}
