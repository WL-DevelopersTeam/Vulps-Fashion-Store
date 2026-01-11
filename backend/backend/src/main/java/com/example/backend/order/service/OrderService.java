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

    // ================================
    // PLACE ORDER (CUSTOMER)
    // ================================
    public Order placeOrder(Order order) {

        // 1️⃣ SET DEFAULT ORDER STATUS
        order.setStatus("PENDING"); // PENDING, ACCEPTED, DELIVERED, DECLINED

        // 2️⃣ SET ORDER DATE
        order.setOrderDate(LocalDateTime.now());

        // 3️⃣ PAYMENT LOGIC
        if ("COD".equalsIgnoreCase(order.getPaymentMethod())) {
            order.setPaymentStatus("PENDING"); // Cash on Delivery
        } else if ("ONLINE".equalsIgnoreCase(order.getPaymentMethod())) {
            order.setPaymentStatus("PAID"); // After payment success
        } else {
            order.setPaymentStatus("UNKNOWN");
        }

        // 4️⃣ SAVE ORDER
        return orderRepository.save(order);
    }

    // ================================
    // GET ALL ORDERS (ADMIN DASHBOARD)
    // ================================
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ================================
    // UPDATE ORDER STATUS (ADMIN)
    // ================================
    public Order updateOrderStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }

    // ================================
    // UPDATE PAYMENT STATUS (FUTURE)
    // ================================
    public Order updatePaymentStatus(Long id, String paymentStatus) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setPaymentStatus(paymentStatus);

        return orderRepository.save(order);
    }
}
