package com.example.emp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.emp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
User findByUsername(String username);
}

