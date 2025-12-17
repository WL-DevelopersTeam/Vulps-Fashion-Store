package com.example.backend.cart.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.cart.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> 
{

    Optional<Cart> findByUserId(Long userId);
}
