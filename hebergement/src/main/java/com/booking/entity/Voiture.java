package com.booking.entity;

import com.booking.dto.HostDto;
import com.booking.dto.VoitureDto;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "voitures")
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Long price;

    public VoitureDto getVoitureDto(){
        VoitureDto voitureDto = new VoitureDto();
        voitureDto.setId(id);
        voitureDto.setName(name);
        voitureDto.setPrice(price);
        return voitureDto;
    }
}
