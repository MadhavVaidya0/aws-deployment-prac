package com.cabbuddy.cabbuddybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findBySourceAndDestinationAndRideDateAndStatus(
            String source,
            String destination,
            LocalDate rideDate,
            RideStatus status
    );

    List<Ride> findByStatus(RideStatus status);
    
    List<Ride> findByDriver_Id(Long driverId);
}
