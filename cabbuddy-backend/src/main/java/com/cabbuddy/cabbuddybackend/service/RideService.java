package com.cabbuddy.cabbuddybackend.service;

import java.time.LocalDate;
import java.util.List;

import com.cabbuddy.cabbuddybackend.dto.RideCreateRequest;
import com.cabbuddy.cabbuddybackend.dto.RideCreateResponse;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;

public interface RideService {

    RideCreateResponse createRide(RideCreateRequest request);

    List<RideCreateResponse> searchRides(
            String source,
            String destination,
            LocalDate rideDate
    );

    RideCreateResponse cancelRide(Long rideId);

    RideCreateResponse getRideById(Long rideId);

    List<RideCreateResponse> getRidesByDriverId(Long driverId);

    List<RideCreateResponse> getRidesByStatus(RideStatus status);
}
