package com.cabbuddy.cabbuddybackend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbuddy.cabbuddybackend.dto.AdminStatsDTO;
import com.cabbuddy.cabbuddybackend.dto.BookingResponseDTO;
import com.cabbuddy.cabbuddybackend.repository.BookingRepository;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;
import com.cabbuddy.cabbuddybackend.service.BookingService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final RideRepository rideRepository;
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getStats() {
        long totalUsers = userRepository.count();
        long totalRides = rideRepository.count();
        long totalBookings = bookingRepository.count();

        AdminStatsDTO stats = new AdminStatsDTO(totalUsers, totalRides, totalBookings);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }
}
