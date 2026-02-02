package com.cabbuddy.cabbuddybackend.service;

import com.cabbuddy.cabbuddybackend.dto.VehicleRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.VehicleResponseDTO;
import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.entity.Vehicle;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;
import com.cabbuddy.cabbuddybackend.repository.VehicleRepository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Service
public class VehicleServiceImplementation implements VehicleService {

    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public VehicleServiceImplementation(
            VehicleRepository vehicleRepository,
            UserRepository userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

//    // ---------------- ADD VEHICLE ----------------
//    @Override
//    public VehicleResponseDTO addVehicle(VehicleRequestDTO dto) {
//
//        User driver = userRepository.findById(dto.getDriverId())
//                .orElseThrow(() -> new ResponseStatusException(
//                        HttpStatus.NOT_FOUND,
//                        "Driver not found with ID: " + dto.getDriverId()
//                ));
//
//        Vehicle vehicle = new Vehicle();
//        vehicle.setVehicleNumber(dto.getVehicleNumber());
//        vehicle.setModel(dto.getModel());
//        vehicle.setType(dto.getType());
//        vehicle.setCapacity(dto.getCapacity());
//        vehicle.setDriver(driver);
//
//        return mapToResponse(vehicleRepository.save(vehicle));
//    }
    
    @Override
    public VehicleResponseDTO addVehicle(VehicleRequestDTO dto) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();

        User driver = userRepository.findByEmailAndActiveTrue(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Driver not found"
                ));

        Vehicle vehicle = new Vehicle();
        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setModel(dto.getModel());
        vehicle.setType(dto.getType());
        vehicle.setCapacity(dto.getCapacity());
        vehicle.setDriver(driver);

        Vehicle saved = vehicleRepository.save(vehicle);
        return mapToResponseDTO(saved);
    }


    // ---------------- GET BY DRIVER ----------------
    @Override
    public VehicleResponseDTO getVehicleByDriver(Long driverId) {
        Vehicle vehicle = vehicleRepository.findByDriver_Id(driverId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Vehicle not found for driver ID: " + driverId
                ));

        return mapToResponse(vehicle);
    }

    // ---------------- UPDATE ----------------
    @Override
    public VehicleResponseDTO updateVehicle(Long id, VehicleRequestDTO dto) {

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Vehicle not found with ID: " + id
                ));

        vehicle.setVehicleNumber(dto.getVehicleNumber());
        vehicle.setModel(dto.getModel());
        vehicle.setType(dto.getType());
        vehicle.setCapacity(dto.getCapacity());

        return mapToResponse(vehicleRepository.save(vehicle));
    }

    // ---------------- DELETE ----------------
    @Override
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Vehicle not found with ID: " + id
                ));

        vehicleRepository.delete(vehicle);
    }
    
    
    @Override
    public List<VehicleResponseDTO> getVehiclesByDriverEmail(String email) {

        List<Vehicle> vehicles = vehicleRepository.findByDriverEmail(email);

        return vehicles.stream()
                .map(this::mapToResponseDTO)
                .toList();
    }

    
    private VehicleResponseDTO mapToResponseDTO(Vehicle vehicle) {

        VehicleResponseDTO dto = new VehicleResponseDTO();
        dto.setId(vehicle.getId());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setModel(vehicle.getModel());
        dto.setType(vehicle.getType());
        dto.setCapacity(vehicle.getCapacity());

        return dto;
    }

    
    

    // ---------------- MAPPER METHOD ----------------
    private VehicleResponseDTO mapToResponse(Vehicle vehicle) {

        VehicleResponseDTO dto = new VehicleResponseDTO();
        dto.setId(vehicle.getId());
        dto.setVehicleNumber(vehicle.getVehicleNumber());
        dto.setModel(vehicle.getModel());
        dto.setType(vehicle.getType());
        dto.setCapacity(vehicle.getCapacity());
        dto.setDriverId(vehicle.getDriver().getId());

        return dto;
    }
}
