package com.example.backend.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.order.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
