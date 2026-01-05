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

                        // Copy product snapshot
                        item.setProductId(product.getId());
                        item.setName(product.getName());
                        item.setImageUrl(product.getImageUrl());
                        item.setPrice(product.getPrice());

                        item.setSize(request.getSize());
                        item.setColor(request.getColor());
                        item.setQuantity(request.getQuantity());

                        cartItemRepository.save(item);

                        cartRepository.save(cart);
    }

    // View cart
    public List<CartItemResponse> getCart(Long userId) {

        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart empty"));

                    return cart.getItems().stream()
                    .map(item -> new CartItemResponse(
                        item.getId(),
                        item.getProductId(),
                        item.getName(),
                        item.getImageUrl(),
                        item.getPrice(),
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

