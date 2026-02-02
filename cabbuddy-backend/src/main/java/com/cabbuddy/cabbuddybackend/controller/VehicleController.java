package com.cabbuddy.cabbuddybackend.controller;

import com.cabbuddy.cabbuddybackend.dto.VehicleRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.VehicleResponseDTO;
import com.cabbuddy.cabbuddybackend.service.VehicleService;
import java.util.List;

import org.springframework.security.core.Authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @PostMapping
    public ResponseEntity<VehicleResponseDTO> addVehicle(
            @RequestBody VehicleRequestDTO dto) {
        return ResponseEntity.ok(vehicleService.addVehicle(dto));
    }

//    @GetMapping("/driver/{driverId}")
//    public ResponseEntity<VehicleResponseDTO> getVehicleByDriver(
//            @PathVariable Long driverId) {
//        return ResponseEntity.ok(vehicleService.getVehicleByDriver(driverId));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> updateVehicle(
            @PathVariable Long id,
            @RequestBody VehicleRequestDTO dto) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok("Vehicle deleted successfully");
    }
    
    @GetMapping
    public ResponseEntity<List<VehicleResponseDTO>> getMyVehicles(
            Authentication authentication) {

        String email = authentication.getName(); // set by JwtFilter
        return ResponseEntity.ok(vehicleService.getVehiclesByDriverEmail(email));
    }

    
}
