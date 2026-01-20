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

    @Autowired
    private SmsService smsService;

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
    Order savedOrder = orderRepository.save(order);

    // 🔔 SEND SMS BASED ON STATUS
    if ("ACCEPTED".equals(status)) {
        smsService.sendSms(
            order.getMobile(),
            "Hi " + order.getFullName() +
            ", your order #" + order.getId() + " has been ACCEPTED."
        );
    }

    if ("DELIVERED".equals(status)) {
        smsService.sendSms(
            order.getMobile(),
            "Your order #" + order.getId() +
            " has been DELIVERED. Thank you for shopping with us!"
        );
    }

    if ("DECLINED".equals(status)) {
        smsService.sendSms(
            order.getMobile(),
            "Sorry! Your order #" + order.getId() +
            " has been DECLINED. Please contact support."
        );
    }

    return savedOrder;
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

    Order savedOrder = orderRepository.save(order);

    // 🔔 SEND SHIPMENT SMS
    smsService.sendSms(
        order.getMobile(),
        "Your order #" + order.getId() +
        " is SHIPPED via " + courierName +
        ". Tracking ID: " + trackingNumber
    );

    return savedOrder;
}

}
