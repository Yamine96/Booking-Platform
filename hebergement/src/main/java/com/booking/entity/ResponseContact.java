package com.booking.entity;

import com.booking.dto.ContactDto;
import com.booking.dto.ResponseContactDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
public class ResponseContact {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String response;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contact_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Contact contact;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;


    public ResponseContactDto getResponseDto(){
        ResponseContactDto responseContactDto = new ResponseContactDto();

        responseContactDto.setId(id);
        responseContactDto.setResponse(response);
        responseContactDto.setUserId(user.getId());
        responseContactDto.setContactId(contact.getId());
        responseContactDto.setName(user.getName());
        responseContactDto.setEmail(user.getEmail());
        responseContactDto.setSubject(contact.getSubject());
        responseContactDto.setMessage(contact.getMessage());
        return responseContactDto;
    }
}
