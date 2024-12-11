package com.booking.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class HostDto {

    private Long id;

    private String type;

    private String description;

    private Long price;

    private String location;

    private MultipartFile image;

    private byte[] returnedImage;

    private MultipartFile video;

    private byte[] returnedVideo;
}
