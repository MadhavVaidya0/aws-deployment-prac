package com.cabbuddy.cabbuddybackend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cabbuddy.cabbuddybackend.config.JwtUtil;
import com.cabbuddy.cabbuddybackend.dto.CreatePaymentRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.PaymentResponseDTO;
import com.cabbuddy.cabbuddybackend.service.PaymentService;

import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final JwtUtil jwtUtil;

    public PaymentController(
            PaymentService paymentService,
            JwtUtil jwtUtil
    ) {
        this.paymentService = paymentService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/create-intent")
    public ResponseEntity<PaymentResponseDTO> createPayment(
            @RequestBody CreatePaymentRequestDTO request,
            HttpServletRequest httpRequest
    ) {

        String token =
            httpRequest.getHeader("Authorization").substring(7);

        Long userId = jwtUtil.extractUserId(token);

        return ResponseEntity.ok(
                paymentService.createPaymentIntent(userId, request)
        );
    }
}

