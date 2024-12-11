package com.booking.dto;

import lombok.Data;

@Data
public class SignupRequest {

    private String email;
    private String name;
    private String password;
    private String ville;
    private Long age;
    private Long tel;

}
