package com.example.backend.cart.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.cart.dto.AddToCartRequest;
import com.example.backend.cart.dto.CartItemResponse;
import com.example.backend.cart.model.Cart;
import com.example.backend.cart.model.CartItem;
import com.example.backend.cart.repository.CartRepository;
import com.example.backend.cart.repository.CartItemRepository;
import com.example.backend.product.model.Product;
import com.example.backend.product.repository.ProductRepository;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    // Add to cart
    public void addToCart(Long userId, AddToCartRequest request) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUserId(userId);
                    newCart.setItems(new ArrayList<>());
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem item = new CartItem();
        item.setCart(cart);
        item.setProduct(product);
        item.setSize(request.getSize());
        item.setColor(request.getColor());
        item.setQuantity(request.getQuantity());

        cart.getItems().add(item);
        cartRepository.save(cart);
    }

    // View cart
    public List<CartItemResponse> getCart(Long userId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart empty"));

        return cart.getItems().stream()
                .map(item -> new CartItemResponse(
                        item.getId(),  
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getImageUrl(),
                        item.getProduct().getPrice(),
                        item.getSize(),
                        item.getColor(),
                        item.getQuantity()
                ))
                .toList();
    }

    // Remove item
    public void removeItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }
}

