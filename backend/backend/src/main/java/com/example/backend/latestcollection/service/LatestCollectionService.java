package com.example.backend.latestcollection.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.example.backend.latestcollection.dto.LatestCollectionRequest;
import com.example.backend.latestcollection.dto.LatestCollectionResponse;
import com.example.backend.latestcollection.model.LatestCollection;
import com.example.backend.latestcollection.repository.LatestCollectionRepository;

@Service
public class LatestCollectionService {

    @Autowired
    private LatestCollectionRepository repository;

    @Autowired
    private Cloudinary cloudinary;

    // Admin adds latest collection
    public void add(LatestCollectionRequest request) throws IOException {

        MultipartFile image = request.getImage();

        // Upload to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(
                image.getBytes(),
                Map.of("folder", "fashion-store/latest")
        );

        String imageUrl = uploadResult.get("secure_url").toString();

        LatestCollection lc = new LatestCollection();
        lc.setTitle(request.getTitle());
        lc.setDescription(request.getDescription());
        lc.setImageUrl(imageUrl);

        repository.save(lc);
    }

    // Fetch for home page
    public List<LatestCollectionResponse> getAll() {
        return repository.findAll()
                .stream()
                .map(l -> new LatestCollectionResponse(
                        l.getId(),
                        l.getTitle(),
                        l.getDescription(),
                        l.getImageUrl()
                ))
                .toList();
    }
}
