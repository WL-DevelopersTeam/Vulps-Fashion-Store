package com.example.backend.returnorder.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.returnorder.repository.ReturnRequestRepository;

@RestController
@RequestMapping("/api/admin/returns")
public class AdminReturnController {

    @Autowired
    private ReturnRequestRepository returnRepository;

    @GetMapping
    public ResponseEntity<?> getAllReturns() {
        return ResponseEntity.ok(returnRepository.findAll());
    }
}
