package com.booking.entity;

import com.booking.dto.BookAHostDto;
import com.booking.dto.MoneyDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Data
public class Money {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long cash;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public MoneyDto getMoneyDto() {
        MoneyDto moneyDto = new MoneyDto();
        moneyDto.setId(id);
        moneyDto.setCash(cash);
        moneyDto.setUserId(user.getId());
        return moneyDto;
    }
}
