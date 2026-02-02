//package com.cabbuddy.cabbuddybackend.entity;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity                  // This class becomes a DB table
//@Table(name = "users")   // Table name
//public class User {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    // Primary key (auto increment)
//    private Long id;
//
//    // User full name
//    private String name;
//
//    @Column(unique = true, nullable = false)
//    // Email must be unique
//    private String email;
//
//    // User password
//    private String password;
//
//    // Phone number
//    private String phone;
//
//    // USER / DRIVER / ADMIN
//    private String role;
//
//    // Account creation time
//    private LocalDateTime createdAt;
//
//    // Constructor (runs automatically)
//    public User() {
//        this.createdAt = LocalDateTime.now();
//    }
//
//    // Getters and Setters (required by Spring)
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//    
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//    
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//    
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
//
//    public String getRole() {
//        return role;
//    }
//    
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public LocalDateTime getCreatedAt() {
//        return createdAt;
//    }
//}



package com.cabbuddy.cabbuddybackend.entity;


import com.cabbuddy.cabbuddybackend.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private String phone;

    //  SOFT DELETE FLAG
    @Column(nullable = false)
    private boolean active = true;
}
