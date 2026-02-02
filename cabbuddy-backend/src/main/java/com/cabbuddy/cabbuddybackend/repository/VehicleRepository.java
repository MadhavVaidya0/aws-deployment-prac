package com.cabbuddy.cabbuddybackend.repository;

import com.cabbuddy.cabbuddybackend.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    // Custom query derived from relationship
    Optional<Vehicle> findByDriver_Id(Long driverId);
    List<Vehicle> findByDriverEmail(String email);
}
