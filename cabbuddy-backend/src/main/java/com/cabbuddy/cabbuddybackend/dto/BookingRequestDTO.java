package com.cabbuddy.cabbuddybackend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookingRequestDTO {

    private Long rideId;
    private int seatsBooked;
}
