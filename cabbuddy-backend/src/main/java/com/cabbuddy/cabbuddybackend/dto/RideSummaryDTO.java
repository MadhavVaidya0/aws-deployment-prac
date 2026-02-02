package com.cabbuddy.cabbuddybackend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RideSummaryDTO {

    private String source;
    private String destination;
    private LocalDate date;
    private LocalTime time;
    private Double price;
}
