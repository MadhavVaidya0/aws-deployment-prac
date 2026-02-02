package com.cabbuddy.cabbuddybackend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.cabbuddy.cabbuddybackend.dto.RideCreateRequest;
import com.cabbuddy.cabbuddybackend.dto.RideCreateResponse;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.RideStatus;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class RideServiceImplementation implements RideService {

    private final RideRepository rideRepository;
    private final UserRepository userRepository;

    // ================= CREATE RIDE =================
    @Override
    @CacheEvict(value = "rides", allEntries = true)
    public RideCreateResponse createRide(RideCreateRequest request) {

        if (request.getRideDate().isBefore(LocalDate.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ride date cannot be in the past"
            );
        }

        User driver = userRepository.findById(request.getDriverId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Driver not found"
                ));

        Ride ride = new Ride();
        ride.setSource(request.getSource().trim().toLowerCase());
        ride.setDestination(request.getDestination().trim().toLowerCase());
        ride.setRideDate(request.getRideDate());
        ride.setDepartureTime(request.getDepartureTime());
        ride.setArrivalTime(request.getArrivalTime());
        ride.setAvailableSeats(request.getAvailableSeats());
        ride.setPricePerSeat(request.getPricePerSeat());
        ride.setStatus(RideStatus.ACTIVE);
        ride.setDriver(driver);

        Ride savedRide = rideRepository.save(ride);
        return mapToResponse(savedRide);
    }

    // ================= SEARCH RIDES (CACHED) =================
    @Override
    @Cacheable(
        value = "rides",
        key = "#source + ':' + #destination + ':' + #rideDate"
    )
    public List<RideCreateResponse> searchRides(
            String source,
            String destination,
            LocalDate rideDate) {

        System.out.println("🔥 DB HIT - searchRides()");

        source = source.trim().toLowerCase();
        destination = destination.trim().toLowerCase();

        return rideRepository
                .findBySourceAndDestinationAndRideDateAndStatus(
                        source,
                        destination,
                        rideDate,
                        RideStatus.ACTIVE
                )
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ================= CANCEL RIDE =================
    @Override
    @CacheEvict(value = "rides", allEntries = true)
    public RideCreateResponse cancelRide(Long rideId) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ride not found"
                ));

        if (ride.getStatus() == RideStatus.CANCELLED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Ride already cancelled"
            );
        }

        ride.setStatus(RideStatus.CANCELLED);
        return mapToResponse(rideRepository.save(ride));
    }

    // ================= GET RIDE BY ID =================
    @Override
    public RideCreateResponse getRideById(Long rideId) {

        Ride ride = rideRepository.findById(rideId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Ride not found"
                ));

        return mapToResponse(ride);
    }

    // ================= GET RIDES BY DRIVER =================
    @Override
    public List<RideCreateResponse> getRidesByDriverId(Long driverId) {

        return rideRepository.findByDriver_Id(driverId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ================= GET RIDES BY STATUS =================
    @Override
    public List<RideCreateResponse> getRidesByStatus(RideStatus status) {

        List<Ride> rides = (status == null)
                ? rideRepository.findAll()
                : rideRepository.findByStatus(status);

        return rides.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ================= ENTITY → DTO =================
    private RideCreateResponse mapToResponse(Ride ride) {

        RideCreateResponse response = new RideCreateResponse();
        response.setId(ride.getId());
        response.setSource(ride.getSource());
        response.setDestination(ride.getDestination());
        response.setRideDate(ride.getRideDate());
        response.setDepartureTime(ride.getDepartureTime());
        response.setArrivalTime(ride.getArrivalTime());
        response.setAvailableSeats(ride.getAvailableSeats());
        response.setPricePerSeat(ride.getPricePerSeat());
        response.setStatus(ride.getStatus());

        if (ride.getDriver() != null) {
            response.setDriverId(ride.getDriver().getId());
            response.setDriverName(ride.getDriver().getName());
        }

        return response;
    }
}
