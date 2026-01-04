package com.example.backend.product.service;

import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
// import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.backend.product.dto.ProductRequest;
import com.example.backend.product.dto.ProductResponse;
import com.example.backend.product.model.Product;
import com.example.backend.product.repository.ProductRepository;


@Service
public class ProductService 
{
    @Autowired
    private ProductRepository productRepository;

    // Add product
    @Autowired
private Cloudinary cloudinary;

public ProductResponse addProduct(ProductRequest request) throws IOException {

    MultipartFile image = request.getImage();

    // Upload to Cloudinary
    Map uploadResult = cloudinary.uploader().upload(
            image.getBytes(),
            Map.of("folder", "fashion-store/products")
    );

    // Get the public URL from Cloudinary
    String imageUrl = uploadResult.get("secure_url").toString();

    Product product = new Product();
    product.setName(request.getName());
    product.setDescription(request.getDescription());
    product.setPrice(request.getPrice());
    product.setCategory(request.getCategory());
    product.setSizes(request.getSizes() == null ? List.of() : request.getSizes());
    product.setColors(request.getColors() == null ? List.of() : request.getColors());


    // Save Cloudinary URL
    product.setImageUrl(imageUrl);

    productRepository.save(product);

    return new ProductResponse(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            imageUrl,
            product.getColors(),
            product.getSizes(),
            product.getCategory()
    );
}


    // Get all products (Customer)

    public List<ProductResponse> getAllProducts() 
    {
        return productRepository.findAll()
                .stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getColors(),
                        p.getSizes(),
                        p.getCategory()
                ))
                .collect(Collectors.toList());
    }

    // Get products by category

    public List<ProductResponse> getProductsByCategory(String category) 
    {
        return productRepository.findByCategory(category)
                .stream()
                .map(p -> new ProductResponse(
                        p.getId(),
                        p.getName(),
                        p.getDescription(),
                        p.getPrice(),
                        p.getImageUrl(),
                        p.getColors(),
                        p.getSizes(),
                        p.getCategory()
                ))
                .collect(Collectors.toList());
    }

    // Get products by size
public List<ProductResponse> getProductsBySize(String size) {
    return productRepository.findBySize(size)
            .stream()
            .map(p -> new ProductResponse(
                    p.getId(),
                    p.getName(),
                    p.getDescription(),
                    p.getPrice(),
                    p.getImageUrl(),  // ✅ Correct
                    p.getSizes(),
                    p.getColors(),
                    p.getCategory()   // ✅ Correct
            ))
            .toList();
}

public List<ProductResponse> getProductsByColor(String color) {
    return productRepository.findByColor(color)
            .stream()
            .map(p -> new ProductResponse(
                    p.getId(),
                    p.getName(),
                    p.getDescription(),
                    p.getPrice(),
                    p.getImageUrl(),  // ✅ Correct
                    p.getSizes(),
                    p.getColors(),
                    p.getCategory()   // ✅ Correct
            ))
            .toList();
}

        public void delete(Long id) {
    if (!productRepository.existsById(id)) {
        throw new RuntimeException("Product not found");
    }
    productRepository.deleteById(id);
}





}
