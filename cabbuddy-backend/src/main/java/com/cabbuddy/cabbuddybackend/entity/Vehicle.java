package com.cabbuddy.cabbuddybackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vehicles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String vehicleNumber;

    private String model;

    // Field name kept as 'type' to match common naming
    private String type; 

    private int capacity;

    // Establishing a 1-to-1 relationship with the User (Driver)
    @OneToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private User driver;
}