package com.example.backend.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.backend.product.model.Product;

public interface ProductRepository extends JpaRepository<Product , Long>
{
    List<Product> findByCategory(String category);
    @Query("""
    SELECT DISTINCT p
    FROM Product p
    JOIN p.sizes s
    WHERE LOWER(s) = LOWER(:size)
""")
    List<Product> findBySize(@Param("size") String size);

    @Query("""
    SELECT DISTINCT p
    FROM Product p
    JOIN p.colors c
    WHERE LOWER(c) = LOWER(:color)
""")
    List<Product> findByColor(@Param("color") String color);

}
