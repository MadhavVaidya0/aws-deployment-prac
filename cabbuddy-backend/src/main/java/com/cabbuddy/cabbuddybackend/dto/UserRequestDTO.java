package com.cabbuddy.cabbuddybackend.dto;

import com.cabbuddy.cabbuddybackend.enums.UserRole;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestDTO {

    private String name;
    private String email;
    private String password;
    private String phone;

    // used only for update
    private UserRole role;
}
