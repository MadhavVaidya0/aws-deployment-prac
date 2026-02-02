package com.cabbuddy.cabbuddybackend.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingResponseDTO {

    private Long bookingId;
    private int seatsBooked;
    private String status;
    private LocalDateTime createdAt;

    private RideSummaryDTO ride;
}
