

package com.cabbuddy.cabbuddybackend.service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cabbuddy.cabbuddybackend.dto.BookingRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.BookingResponseDTO;
import com.cabbuddy.cabbuddybackend.dto.RideSummaryDTO;
import com.cabbuddy.cabbuddybackend.entity.Booking;
import com.cabbuddy.cabbuddybackend.entity.Ride;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.enums.BookingStatus;
import com.cabbuddy.cabbuddybackend.repository.BookingRepository;
import com.cabbuddy.cabbuddybackend.repository.RideRepository;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;
import com.cabbuddy.cabbuddybackend.service.BookingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RideRepository rideRepository;
    private final UserRepository userRepository;

//    @Override
//    public BookingResponseDTO createBooking(Long userId, BookingRequestDTO requestDTO) {
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Ride ride = rideRepository.findById(requestDTO.getRideId())
//                .orElseThrow(() -> new RuntimeException("Ride not found"));
//
//        Booking booking = new Booking();
//        booking.setUser(user);
//        booking.setRide(ride);
//        booking.setSeatsBooked(requestDTO.getSeatsBooked());
//        booking.setStatus(BookingStatus.CONFIRMED);
//
//        Booking savedBooking = bookingRepository.save(booking);
//
//        return mapToResponseDTO(savedBooking);
//    }
    
    @Override
    @Transactional
    public BookingResponseDTO createBooking(Long userId, BookingRequestDTO requestDTO) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Ride ride = rideRepository.findById(requestDTO.getRideId())
                .orElseThrow(() -> new RuntimeException("Ride not found"));

        int seatsRequested = requestDTO.getSeatsBooked();

        // Seat validation
        if (ride.getAvailableSeats() < seatsRequested) {
            throw new RuntimeException("Not enough seats available");
        }

        //  Reduce seats
        ride.setAvailableSeats(
                ride.getAvailableSeats() - seatsRequested
        );

        //  Save updated ride
        rideRepository.save(ride);

        //  Create booking
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRide(ride);
        booking.setSeatsBooked(seatsRequested);
        booking.setStatus(BookingStatus.CONFIRMED);

        Booking savedBooking = bookingRepository.save(booking);

        return mapToResponseDTO(savedBooking);
    }

    

    @Override
    public BookingResponseDTO getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return mapToResponseDTO(booking);
    }

    @Override
    public List<BookingResponseDTO> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public List<BookingResponseDTO> getBookingsByRideId(Long rideId) {
        return bookingRepository.findAll()
                .stream()
                .filter(b -> b.getRide().getId().equals(rideId))
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    @Override
    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    /* -------------------- PRIVATE MAPPER -------------------- */

    private BookingResponseDTO mapToResponseDTO(Booking booking) {

        Ride ride = booking.getRide();

        RideSummaryDTO rideSummary = new RideSummaryDTO();
        rideSummary.setSource(ride.getSource());
        rideSummary.setDestination(ride.getDestination());

        // Correct field mapping
        rideSummary.setDate(ride.getRideDate());
        rideSummary.setTime(ride.getDepartureTime());
        rideSummary.setPrice(ride.getPricePerSeat());

        BookingResponseDTO responseDTO = new BookingResponseDTO();
        responseDTO.setBookingId(booking.getId());
        responseDTO.setSeatsBooked(booking.getSeatsBooked());
        responseDTO.setStatus(booking.getStatus().name());
        responseDTO.setCreatedAt(booking.getCreatedAt());
        responseDTO.setRide(rideSummary);

        return responseDTO;
    }

}
