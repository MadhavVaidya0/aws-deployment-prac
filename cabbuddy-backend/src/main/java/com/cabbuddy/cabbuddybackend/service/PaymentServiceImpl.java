package com.cabbuddy.cabbuddybackend.service;

import org.springframework.stereotype.Service;

import com.cabbuddy.cabbuddybackend.dto.CreatePaymentRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.PaymentResponseDTO;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;
//import com.stripe.*;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import org.springframework.beans.factory.annotation.Value;

import jakarta.annotation.PostConstruct;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    private final RideRepository rideRepository;

    public PaymentServiceImpl(RideRepository rideRepository) {
        this.rideRepository = rideRepository;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @Override
    public PaymentResponseDTO createPaymentIntent(
            Long userId,
            CreatePaymentRequestDTO request
    ) {

        Ride ride = rideRepository.findById(request.getRideId())
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        if (ride.getAvailableSeats() < request.getSeatsBooked()) {
            throw new RuntimeException("Not enough seats available");
        }

        double totalAmount =
                ride.getPricePerSeat() * request.getSeatsBooked();

        try {      	
        	PaymentIntentCreateParams params =
        		    PaymentIntentCreateParams.builder()
        		        .setAmount((long) (totalAmount * 100))
        		        .setCurrency("inr")
        		        .addPaymentMethodType("card") // ✅ ADD THIS
        		        .putMetadata("rideId", ride.getId().toString())
        		        .putMetadata("userId", userId.toString())
        		        .build();


            PaymentIntent intent =
                    PaymentIntent.create(params);

            return new PaymentResponseDTO(
                    intent.getClientSecret(),
                    ride.getId(),
                    request.getSeatsBooked(),
                    totalAmount
            );

        } catch (StripeException e) {
            throw new RuntimeException("Stripe payment failed");
        }
    }
}
