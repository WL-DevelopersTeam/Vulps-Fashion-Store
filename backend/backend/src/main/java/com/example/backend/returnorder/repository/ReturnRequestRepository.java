package com.example.backend.returnorder.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.returnorder.entity.ReturnRequest;

public interface ReturnRequestRepository 
        extends JpaRepository<ReturnRequest, Long> {
}