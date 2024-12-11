package com.booking.entity;

import com.booking.dto.HostDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "hosts")
public class Host {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private String description;

    private Long price;

    private String location;

    @Column(columnDefinition = "longblob")
    private byte[] image;

    @Column(columnDefinition = "longblob")
    private byte[] video;
    public HostDto getHostDto() {
        HostDto hostDto = new HostDto();
        hostDto.setId(id);
        hostDto.setType(type);
        hostDto.setDescription(description);
        hostDto.setLocation(location);
        hostDto.setPrice(price);
        hostDto.setReturnedImage(image);
        hostDto.setReturnedVideo(video);
        return hostDto;
    }
}
