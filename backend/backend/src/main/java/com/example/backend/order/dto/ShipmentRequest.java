package com.example.backend.order.dto;

public class ShipmentRequest {
    private String courierName;
    private String trackingNumber;
    public String getCourierName() {
        return courierName;
    }
    public void setCourierName(String courierName) {
        this.courierName = courierName;
    }
    public String getTrackingNumber() {
        return trackingNumber;
    }
    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    // getters & setters

    
}