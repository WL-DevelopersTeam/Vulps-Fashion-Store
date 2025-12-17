package com.example.backend.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.cart.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> 
{
}