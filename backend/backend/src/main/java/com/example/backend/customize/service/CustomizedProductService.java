package com.example.backend.customize.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.customize.dto.CustomizedProductRequest;
import com.example.backend.customize.dto.CustomizedProductResponse;
import com.example.backend.customize.model.CustomizedProduct;
import com.example.backend.customize.repository.CustomizedProductRepository;

@Service
public class CustomizedProductService 
{
    @Autowired
    private CustomizedProductRepository repository;

    // User submits customization
    public void create(CustomizedProductRequest request) {

        CustomizedProduct cp = new CustomizedProduct();
        cp.setClientName(request.getClientName());
        cp.setSize(request.getSize());
        cp.setColor(request.getColor());
        cp.setMessage(request.getMessage());
        //cp.setStatus("PENDING");

        repository.save(cp);
    }

    // Admin views all requests
    public List<CustomizedProductResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(c -> new CustomizedProductResponse(
                        c.getId(),
                        c.getClientName(),
                        c.getSize(),
                        c.getColor(),
                        c.getMessage()
                        //c.getStatus()
                ))
                .toList();
    }       
}
