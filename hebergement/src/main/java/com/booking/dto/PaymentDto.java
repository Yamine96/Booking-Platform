package com.booking.dto;

import lombok.Data;

import java.util.Date;

@Data
public class PaymentDto {

    private Long id;

    private String cardHolder;

    private Long cardNumber;

    private Date expiryDate;

    private Long cvv;

    private Long bookId;

    private Long userId;
}
