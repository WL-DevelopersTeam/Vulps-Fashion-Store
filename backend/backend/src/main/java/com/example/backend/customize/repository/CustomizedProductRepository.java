package com.example.backend.customize.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.customize.model.CustomizedProduct;

public interface CustomizedProductRepository  extends JpaRepository<CustomizedProduct, Long>
{

}
