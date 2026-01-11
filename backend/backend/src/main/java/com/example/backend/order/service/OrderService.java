package com.example.backend.order.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.order.model.Order;
import com.example.backend.order.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // 🔹 PLACE ORDER
    public Order placeOrder(Order order) {
        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());
        return orderRepository.save(order);
    }

    // 🔹 GET ALL ORDERS (ADMIN)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // 🔹 UPDATE STATUS
    public void updateOrderStatus(Long id, String newStatus) {

    Order order = orderRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Order not found"));

    String current = order.getStatus();

    if ("PENDING".equals(current)) {
        if ("ACCEPTED".equals(newStatus) || "DECLINED".equals(newStatus)) {
            order.setStatus(newStatus);
        } else {
            throw new RuntimeException("Invalid transition");
        }
    }

    else if ("ACCEPTED".equals(current)) {
        if ("DELIVERED".equals(newStatus)) {
            order.setStatus(newStatus);
        } else {
            throw new RuntimeException("Invalid transition");
        }
    }

    else {
        throw new RuntimeException("Order already closed");
    }

    orderRepository.save(order);
}

}
