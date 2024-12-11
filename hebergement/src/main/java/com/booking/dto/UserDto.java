package com.booking.dto;

import com.booking.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;

    private String name;

    private String ville;

    private Long age;

    private Long tel;

    private String email;

    private UserRole userRole;
}
