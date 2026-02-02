package com.cabbuddy.cabbuddybackend.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabbuddy.cabbuddybackend.dto.RideCreateRequest;
import com.cabbuddy.cabbuddybackend.dto.RideCreateResponse;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;
import com.cabbuddy.cabbuddybackend.service.RideService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/rides")
@CrossOrigin(origins = "http://localhost:5173")
public class RideController {

    @Autowired
    private RideService rideService;


    @GetMapping("/search")
    public List<RideCreateResponse> searchRides(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                    LocalDate rideDate) {

        return rideService.searchRides(source, destination, rideDate);
    }
    
    // Create ride
    @PostMapping
    public ResponseEntity<RideCreateResponse> createRide(@Valid @RequestBody RideCreateRequest newride) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rideService.createRide(newride));
    }

    // Cancel ride
    @PutMapping("/{id}/cancel")
    public ResponseEntity<RideCreateResponse> cancelRide(@PathVariable Long id) {
        return ResponseEntity.ok(rideService.cancelRide(id));
    }

    // Get ride by ID
    @GetMapping("/{id}")
    public ResponseEntity<RideCreateResponse> getRideById(@PathVariable Long id) {
        return ResponseEntity.ok(rideService.getRideById(id));
    }

    @GetMapping("/driver/{driverId}")
    public ResponseEntity<List<RideCreateResponse>> getRidesByDriver(
            @PathVariable Long driverId
    ) {
        return ResponseEntity.ok(
                rideService.getRidesByDriverId(driverId)
        );
    }


    // Get rides by status
    @GetMapping("/status")
    public ResponseEntity<List<RideCreateResponse>> getRidesByStatus(
            @RequestParam(required = false) RideStatus status) {
        return ResponseEntity.ok(rideService.getRidesByStatus(status));
    }
}
