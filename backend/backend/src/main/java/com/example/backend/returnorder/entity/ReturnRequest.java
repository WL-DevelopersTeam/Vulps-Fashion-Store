package com.example.backend.returnorder.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

import com.example.backend.order.model.Order;

@Entity
public class ReturnRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String refundMethod;
    private String upiId;
    private String accountName;
    private String accountNumber;
    private String ifscCode;

    private String status;
    private LocalDateTime requestedAt;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private Order order;

    // ===== GETTERS & SETTERS =====

    public Long getId() { return id; }

    public void setRefundMethod(String refundMethod) { this.refundMethod = refundMethod; }
    public String getRefundMethod() { return refundMethod; }

    public void setUpiId(String upiId) { this.upiId = upiId; }
    public String getUpiId() { return upiId; }

    public void setAccountName(String accountName) { this.accountName = accountName; }
    public String getAccountName() { return accountName; }

    public void setAccountNumber(String accountNumber) { this.accountNumber = accountNumber; }
    public String getAccountNumber() { return accountNumber; }

    public void setIfscCode(String ifscCode) { this.ifscCode = ifscCode; }
    public String getIfscCode() { return ifscCode; }

    public void setStatus(String status) { this.status = status; }
    public String getStatus() { return status; }

    public void setRequestedAt(LocalDateTime requestedAt) { this.requestedAt = requestedAt; }
    public LocalDateTime getRequestedAt() { return requestedAt; }

    public void setOrder(Order order) { this.order = order; }
    public Order getOrder() { return order; }
}