package com.booking.dto;

import com.booking.enums.BookHostStatus;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
public class BookAHostDto {

    private Long id;

    private Date fromDate;

    private Date toDate;

    private Long days;

    private Long price;

    private BookHostStatus bookHostStatus;

    private Long hostId;

    private Long userId;

    private String username;

    private String typename;

    private String email;

}
