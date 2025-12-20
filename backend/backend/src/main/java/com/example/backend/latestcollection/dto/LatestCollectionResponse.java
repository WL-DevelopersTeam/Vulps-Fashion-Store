package com.example.backend.latestcollection.dto;


public class LatestCollectionResponse 
{
    
    private Long id;
    private String title;
    private String description;
    private String imageUrl;

    public LatestCollectionResponse(Long id, String title,
                                    String description,
                                    String imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    // getters
}
