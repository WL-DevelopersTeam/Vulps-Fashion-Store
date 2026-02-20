package com.example.backend.returnorder.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.returnorder.dto.ReturnRequestDTO;
import com.example.backend.returnorder.entity.ReturnRequest;
import com.example.backend.returnorder.repository.ReturnRequestRepository;
import com.example.backend.order.model.Order;
import com.example.backend.order.repository.OrderRepository;


@Service
public class ReturnRequestService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ReturnRequestRepository returnRepository;

    public void createReturnRequest(Long orderId, ReturnRequestDTO dto) {

    Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new RuntimeException("Order not found"));

    if (!order.getStatus().equals("DELIVERED")
            && !order.getStatus().equals("SHIPPED")) {
        throw new RuntimeException("Return not allowed");
    }

    ReturnRequest request = new ReturnRequest();

    request.setRefundMethod(dto.getRefundMethod());
    request.setUpiId(dto.getUpiId());
    request.setAccountName(dto.getAccountName());
    request.setAccountNumber(dto.getAccountNumber());
    request.setIfscCode(dto.getIfsc());
    request.setStatus("REQUESTED");
    request.setRequestedAt(LocalDateTime.now());
    request.setOrder(order);

    returnRepository.save(request);

    order.setStatus("RETURN_REQUESTED");
    orderRepository.save(order);
}
}
