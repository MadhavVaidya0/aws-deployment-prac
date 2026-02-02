package com.cabbuddy.cabbuddybackend.dto;

/**
 * DTO used to ACCEPT data from client.
 * This avoids exposing Entity directly.
 */
public class VehicleRequestDTO {

    private String vehicleNumber;
    private String model;
    private String type;
    private int capacity;

    // We only accept driverId from client
    private Long driverId;

    // getters & setters
    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Long getDriverId() {
        return driverId;
    }

    public void setDriverId(Long driverId) {
        this.driverId = driverId;
    }
}
