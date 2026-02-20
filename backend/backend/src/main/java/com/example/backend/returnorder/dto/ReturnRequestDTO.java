package com.example.backend.returnorder.dto;

import lombok.Data;

@Data
public class ReturnRequestDTO {

    private String refundMethod;
    private String upiId;
    private String accountName;
    private String accountNumber;
    private String ifsc;
}