package com.cabbuddy.cabbuddybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PaymentResponseDTO {
    private String clientSecret;
    private Long rideId;
    private int seatsBooked;
    private double totalAmount;
}
