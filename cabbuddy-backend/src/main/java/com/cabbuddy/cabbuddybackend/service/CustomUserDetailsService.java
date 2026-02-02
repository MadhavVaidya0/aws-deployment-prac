package com.cabbuddy.cabbuddybackend.service;

import com.cabbuddy.cabbuddybackend.entity.User;
import com.cabbuddy.cabbuddybackend.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        //  Find user AND ensure active (soft delete)
        User user = userRepository.findByEmailAndActiveTrue(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found or inactive: " + email
                        ));

        //  Map to Spring Security User
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),                        // username
                user.getPassword(),                     // encoded password
                List.of(new SimpleGrantedAuthority(
                        "ROLE_" + user.getRole().name() // ROLE_ADMIN / ROLE_USER
                ))
        );
    }
}
