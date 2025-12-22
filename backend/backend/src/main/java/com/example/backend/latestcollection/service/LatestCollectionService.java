package com.example.backend.latestcollection.service;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.backend.latestcollection.dto.LatestCollectionRequest;
import com.example.backend.latestcollection.dto.LatestCollectionResponse;
import com.example.backend.latestcollection.model.LatestCollection;
import com.example.backend.latestcollection.repository.LatestCollectionRepository;

@Service
public class LatestCollectionService {

    @Autowired
    private LatestCollectionRepository repository;

    private final String uploadDir =
        System.getProperty("user.dir") + "/backend/images/latest/";


    // Admin adds latest collection
    public void add(LatestCollectionRequest request) throws IOException {

        MultipartFile image = request.getImage();
        String fileName = System.currentTimeMillis() + "_" +
                StringUtils.cleanPath(image.getOriginalFilename());

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Files.copy(image.getInputStream(),
                uploadPath.resolve(fileName),
                StandardCopyOption.REPLACE_EXISTING);

        LatestCollection lc = new LatestCollection();
        lc.setTitle(request.getTitle());
        lc.setDescription(request.getDescription());
        lc.setImageUrl("/images/latest/" + fileName);
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

