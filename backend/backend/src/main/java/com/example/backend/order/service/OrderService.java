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

        order.setStatus("PENDING");
        order.setOrderDate(LocalDateTime.now());

        // PAYMENT LOGIC
        if ("COD".equalsIgnoreCase(order.getPaymentMethod())) {
            order.setPaymentStatus("PENDING");
        } else if ("ONLINE".equalsIgnoreCase(order.getPaymentMethod())) {
            order.setPaymentStatus("PAID");
        } else {
            order.setPaymentStatus("UNKNOWN");
        }

        return orderRepository.save(order);
    }

    // ================================
    // GET ALL ORDERS (ADMIN)
    // ================================
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

        // ================================
        // GET CUSTOMER ORDERS (PROFILE PAGE)
        // ================================
        public List<Order> getOrdersByUserId(Long userId) {
    return orderRepository.findByUserId(userId);
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
    // UPDATE PAYMENT STATUS
    // ================================
    public Order updatePaymentStatus(Long id, String paymentStatus) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setPaymentStatus(paymentStatus);

        return orderRepository.save(order);
    }
    

    public Order shipOrder(Long id, String courierName, String trackingNumber) {

    Order order = orderRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Order not found"));

    order.setStatus("SHIPPED");
    order.setCourierName(courierName);
    order.setTrackingNumber(trackingNumber);
    order.setShippedDate(LocalDateTime.now());

    return orderRepository.save(order);
}
}
