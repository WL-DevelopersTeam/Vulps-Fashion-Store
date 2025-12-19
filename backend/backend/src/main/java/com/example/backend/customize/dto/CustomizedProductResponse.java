package com.example.backend.customize.dto;

public class CustomizedProductResponse 
{
    private Long id;
    private String clientName;
    private String size;
    private String color;
    private String message;
    //private String status;

    public CustomizedProductResponse(Long id, String clientName,
                                     String size, String color,
                                     String message) {
        this.id = id;
        this.clientName = clientName;
        this.size = size;
        this.color = color;
        this.message = message;
        //this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getClientName() {
        return clientName;
    }

    public String getSize() {
        return size;
    }

    public String getColor() {
        return color;
    }

    public String getMessage() {
        return message;
    }

    // public String getStatus() {
    //     return status;
    // }

    
}
