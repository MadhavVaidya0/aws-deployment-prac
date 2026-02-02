package com.cabbuddy.cabbuddybackend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabbuddy.cabbuddybackend.config.JwtUtil;
import com.cabbuddy.cabbuddybackend.dto.BookingRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.BookingResponseDTO;
import com.cabbuddy.cabbuddybackend.service.BookingService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;
    private final JwtUtil jwtUtil;   // ADD THIS

//    @PostMapping
//    public ResponseEntity<BookingResponseDTO> createBooking(
//            @RequestParam Long userId,
//            @RequestBody BookingRequestDTO requestDTO) {
//
//        return new ResponseEntity<>(
//                bookingService.createBooking(userId, requestDTO),
//                HttpStatus.CREATED
//        );
//    }
    
    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @RequestBody BookingRequestDTO requestDTO,
            HttpServletRequest request) {

        String token = request.getHeader("Authorization").substring(7);
        Long userId = jwtUtil.extractUserId(token);

        return new ResponseEntity<>(
                bookingService.createBooking(userId, requestDTO),
                HttpStatus.CREATED
        );
    }


    @GetMapping("/{id}")
    public BookingResponseDTO getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<BookingResponseDTO> getBookingsByUserId(@PathVariable Long userId) {
        return bookingService.getBookingsByUserId(userId);
    }

    @GetMapping("/ride/{rideId}")
    public List<BookingResponseDTO> getBookingsByRideId(@PathVariable Long rideId) {
        return bookingService.getBookingsByRideId(rideId);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }
}
