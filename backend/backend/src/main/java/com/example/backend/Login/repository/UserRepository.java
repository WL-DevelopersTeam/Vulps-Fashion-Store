package com.example.backend.Login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.backend.Login.model.User;

public interface UserRepository extends JpaRepository<User,Long>
{
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}
