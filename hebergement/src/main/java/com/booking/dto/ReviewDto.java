package com.booking.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ReviewDto {

    private Long id;


    private Date reviewDate;


    private String review;


    private Long rating;


    private Long userId;


    private Long hostId;


    private String userName;


    private String typeName;


    private Long bookId;
}
