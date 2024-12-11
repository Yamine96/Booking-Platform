package com.booking.entity;
import com.booking.dto.BookAHostDto;
import com.booking.enums.BookHostStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Entity
@Data
public class BookAHost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date fromDate;

    @Temporal(TemporalType.DATE)
    private Date toDate;

    private Long days;

    private Long price;
    
    private BookHostStatus bookHostStatus;



    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "host_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Host host;


    public BookAHostDto getBookAHostDto() {
        BookAHostDto bookAHostDto = new BookAHostDto();
        bookAHostDto.setId(id);
        bookAHostDto.setDays(days);
        bookAHostDto.setBookHostStatus(bookHostStatus);
        bookAHostDto.setPrice(price);
        bookAHostDto.setToDate(toDate);
        bookAHostDto.setFromDate(fromDate);
        bookAHostDto.setEmail(user.getEmail());
        bookAHostDto.setUsername(user.getName());
        bookAHostDto.setTypename(host.getType());
        bookAHostDto.setUserId(user.getId());
        bookAHostDto.setHostId(host.getId());
        return bookAHostDto;
    }

}
