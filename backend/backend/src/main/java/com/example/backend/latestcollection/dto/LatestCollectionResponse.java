package com.example.backend.latestcollection.dto;


public class LatestCollectionResponse 
{
    
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private Long price;

    public LatestCollectionResponse(Long id, String title,
                                    String description,
                                    String imageUrl,
                                    Long price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price=price;

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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    
    // getters
}
