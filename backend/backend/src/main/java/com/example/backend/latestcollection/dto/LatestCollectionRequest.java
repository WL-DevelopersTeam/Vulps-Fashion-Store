package com.example.backend.latestcollection.dto;

import org.springframework.web.multipart.MultipartFile;

public class LatestCollectionRequest 
{
    private String title;
    private String description;
    private MultipartFile image;
    private Long price;
    
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public MultipartFile getImage() {
        return image;
    }
    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public Long getPrice() {
        return price;
    }
    public void setPrice(Long price) {
        this.price = price;
    }

    

}
