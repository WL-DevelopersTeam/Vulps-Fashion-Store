package com.example.backend.product.controller;

// import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import com.example.backend.product.dto.ProductRequest;
import com.example.backend.product.dto.ProductResponse;
import com.example.backend.product.service.ProductService;

import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://vulps-fashion-store.vercel.app",
    "https://vulpsfashionstore.vercel.app"
})
public class ProductController {

    @Autowired
    private ProductService productService;

    // ✅ ADD PRODUCT
   @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponse> addProduct(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam("sizes") String sizes,
            @RequestParam("colors") String colors,
            @RequestParam("image") MultipartFile image
    ) throws Exception {

        ObjectMapper mapper = new ObjectMapper();

        List<String> sizeList = mapper.readValue(sizes, new TypeReference<List<String>>() {});
        List<String> colorList = mapper.readValue(colors, new TypeReference<List<String>>() {});

        ProductRequest request = new ProductRequest();
        request.setName(name);
        request.setDescription(description);
        request.setPrice(price);
        request.setCategory(category);
        request.setSizes(sizeList);
        request.setColors(colorList);
        request.setImage(image);

        return ResponseEntity.ok(productService.addProduct(request));
    }

    // ✅ GET ALL
    @GetMapping
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    // ✅ GET BY CATEGORY
    @GetMapping("/category/{category}")
    public List<ProductResponse> getByCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    // ✅ GET BY SIZE
    @GetMapping("/size/{size}")
    public List<ProductResponse> getBySize(@PathVariable String size) {
        return productService.getProductsBySize(size);
    }

    // ✅ GET BY COLOR
    @GetMapping("/color/{color}")
    public List<ProductResponse> getByColor(@PathVariable String color) {
        return productService.getProductsByColor(color);
    }
}
