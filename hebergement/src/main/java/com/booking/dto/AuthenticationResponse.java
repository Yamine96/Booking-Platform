package com.booking.dto;

import com.booking.enums.UserRole;
import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;

    private UserRole userRole;

    private Long userId;

    private String name;

    private String email;
}
