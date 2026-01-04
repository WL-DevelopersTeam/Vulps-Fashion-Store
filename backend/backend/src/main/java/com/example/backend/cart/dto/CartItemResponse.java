package com.example.backend.cart.dto;

public class CartItemResponse {

    private Long cartItemId;
    private Long productId;
    private String productName;
    private String imageUrl;
    private double price;
    private String size;
    private String color;
    private int quantity;

    
    public void setCartItemId(Long cartItemId) {
        this.cartItemId = cartItemId;
    }
    public Long getProductId() {
        return productId;
    }
    public Long getCartItemId() {
        return cartItemId;
    }
    public String getProductName() {
        return productName;
    }
    public String getImageUrl() {
        return imageUrl;
    }
    public double getPrice() {
        return price;
    }
    public String getSize() {
        return size;
    }
    public String getColor() {
        return color;
    }
    public int getQuantity() {
        return quantity;
    }
    public CartItemResponse(Long cartItemId,Long productId, String productName, String imageUrl, double price, String size,
            String color, int quantity) {
        this.cartItemId=cartItemId;
        this.productId = productId;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.price = price;
        this.size = size;
        this.color = color;
        this.quantity = quantity;
    }

    // constructor + getters
}
