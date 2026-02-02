package com.cabbuddy.cabbuddybackend.service;

import com.cabbuddy.cabbuddybackend.dto.CreatePaymentRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.PaymentResponseDTO;

public interface PaymentService {
    PaymentResponseDTO createPaymentIntent(
        Long userId,
        CreatePaymentRequestDTO request
    );
}
