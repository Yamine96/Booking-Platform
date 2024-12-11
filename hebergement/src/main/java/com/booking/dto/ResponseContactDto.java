package com.booking.dto;


import lombok.Data;

@Data
public class ResponseContactDto {


    private Long id;

    private String response;

    private Long contactId;

    private Long userId;

    private String subject;

    private String message;

    private String name;

    private String email;
}
