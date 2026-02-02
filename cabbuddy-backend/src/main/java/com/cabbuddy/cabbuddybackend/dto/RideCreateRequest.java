package com.cabbuddy.cabbuddybackend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

//getters setters annotation
@Getter
@Setter
public class RideCreateRequest {

    @NotBlank(message = "Source is required")
    private String source;

    @NotBlank(message = "Destination is required")
    private String destination;

    @NotNull(message = "Ride date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate rideDate;

    // Departure time (pickup time) - REPLACES rideTime
    @NotNull(message = "Departure time is required")
    @JsonFormat(pattern = "[HH:mm:ss][HH:mm]")
    private LocalTime departureTime;

    // Arrival time (drop-off time)
    @NotNull(message = "Arrival time is required")
    @JsonFormat(pattern = "[HH:mm:ss][HH:mm]")
    private LocalTime arrivalTime;

    @Min(value = 1, message = "Available seats must be at least 1")
    private int availableSeats;

    @Min(value = 1, message = "Price per seat must be at least 1")
    private double pricePerSeat;

    @NotNull(message = "Driver id is required")
    private Long driverId;   // TEMP (until Spring Security)
}
