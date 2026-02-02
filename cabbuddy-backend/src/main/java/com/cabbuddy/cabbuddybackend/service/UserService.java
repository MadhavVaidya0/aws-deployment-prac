package com.cabbuddy.cabbuddybackend.service;

import com.cabbuddy.cabbuddybackend.dto.UserRequestDTO;
import com.cabbuddy.cabbuddybackend.dto.UserResponseDTO;
import com.cabbuddy.cabbuddybackend.enums.UserRole;

import java.util.List;

public interface UserService {

    UserResponseDTO registerUser(UserRequestDTO userDTO);

    UserResponseDTO getUserById(Long id);

    List<UserResponseDTO> getAllUsers();

    List<UserResponseDTO> getUsersByRole(UserRole role);

    UserResponseDTO updateUser(Long id, UserRequestDTO userDTO);

    void deleteUser(Long id);
}
