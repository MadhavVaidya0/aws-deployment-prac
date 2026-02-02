package com.cabbuddy.cabbuddybackend.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import com.cabbuddy.cabbuddybackend.enums.RideStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RideCreateResponse implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String source;
    private String destination;
    private LocalDate rideDate;
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private int availableSeats;
    private double pricePerSeat;
    private RideStatus status;
    private Long driverId;
    private String driverName;
    
}