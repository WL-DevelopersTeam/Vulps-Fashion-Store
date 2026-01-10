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

    // ✅ PLACE ORDER
    @PostMapping
    public ResponseEntity<Order> placeOrder(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.placeOrder(order));
    }

    // ✅ GET ALL ORDERS (ADMIN)
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // ✅ ACCEPT ORDER
    @PutMapping("/{id}/accept")
    public ResponseEntity<String> acceptOrder(@PathVariable Long id) {
        orderService.updateOrderStatus(id, "ACCEPTED");
        return ResponseEntity.ok("Order accepted");
    }

    // ✅ DECLINE ORDER
    @PutMapping("/{id}/decline")
    public ResponseEntity<String> declineOrder(@PathVariable Long id) {
        orderService.updateOrderStatus(id, "DECLINED");
        return ResponseEntity.ok("Order declined");
    }
}
