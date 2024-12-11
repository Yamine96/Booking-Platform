package com.booking.entity;

import com.booking.dto.ContactDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private String message;

    private String name;

    private String email;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;



    public ContactDto getContactDto(){
        ContactDto contactDto = new ContactDto();

        contactDto.setId(id);
        contactDto.setSubject(subject);
        contactDto.setMessage(message);
        contactDto.setUserId(user.getId());
        contactDto.setName(user.getName());
        contactDto.setEmail(user.getEmail());

        return contactDto;
    }

}
