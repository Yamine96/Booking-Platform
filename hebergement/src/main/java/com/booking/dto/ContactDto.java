package com.booking.dto;

import lombok.Data;

@Data
public class ContactDto {


    private Long id;

    private String subject;

    private String message;

    private Long userId;

    private String name;

    private String email;

}
