package com.example.backend.latestcollection.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.latestcollection.dto.LatestCollectionRequest;
import com.example.backend.latestcollection.dto.LatestCollectionResponse;
import com.example.backend.latestcollection.service.LatestCollectionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/latest-collections")
public class LatestCollectionController {

    @Autowired
    private LatestCollectionService service;

    // Admin adds
    @PostMapping
    public void add(@ModelAttribute LatestCollectionRequest request)
            throws IOException {
        service.add(request);
    }

    // Home page fetch
    @GetMapping
    public List<LatestCollectionResponse> getAll() {
        return service.getAll();
    }
}

