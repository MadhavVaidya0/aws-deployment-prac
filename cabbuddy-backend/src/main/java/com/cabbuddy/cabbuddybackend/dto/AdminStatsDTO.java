package com.cabbuddy.cabbuddybackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDTO {

    private long totalUsers;
    private long totalRides;
    private long totalBookings;
}
