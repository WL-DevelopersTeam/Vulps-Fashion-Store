package com.example.backend.order.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.order.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> 
{
        // 🔹 FETCH CUSTOMER ORDERS (PROFILE PAGE)
            List<Order> findByUserId(Long userId);
}
