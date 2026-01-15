package com.example.backend.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.backend.order.model.Order;
import com.example.backend.order.service.OrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://vulps-fashion-store.vercel.app"
})
public class OrderController {

    @Autowired
    private OrderService orderService;

    // ================================
    // PLACE ORDER
    // ================================
    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    // ================================
    // ADMIN: GET ALL ORDERS
    // ================================
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // ================================
    // CUSTOMER: GET PROFILE ORDERS
    // ================================
    @GetMapping("/user/{userId}")
public List<Order> getOrdersByUserId(@PathVariable Long userId) {
    return orderService.getOrdersByUserId(userId);
}

    // ================================
    // ADMIN: ACCEPT ORDER
    // ================================
    @PutMapping("/{id}/accept")
    public ResponseEntity<String> acceptOrder(@PathVariable Long id) {
        orderService.updateOrderStatus(id, "ACCEPTED");
        return ResponseEntity.ok("Order accepted");
    }

    // ================================
    // ADMIN: DELIVER ORDER
    // ================================
    @PutMapping("/{id}/deliver")
    public ResponseEntity<String> deliverOrder(@PathVariable Long id) {
        orderService.updateOrderStatus(id, "DELIVERED");
        return ResponseEntity.ok("Order delivered");
    }

    // ================================
    // ADMIN: DECLINE ORDER
    // ================================
    @PutMapping("/{id}/decline")
    public ResponseEntity<String> declineOrder(@PathVariable Long id) {
        orderService.updateOrderStatus(id, "DECLINED");
        return ResponseEntity.ok("Order declined");
    }

    // ================================
    // ADMIN: SHIP ORDER
    // ================================
    @PutMapping("/{id}/ship")
    public ResponseEntity<String> shipOrder(@PathVariable Long id) {
        orderService.updateOrderStatus(id, "SHIPPED");
        return ResponseEntity.ok("Order shipped");
    }
}
