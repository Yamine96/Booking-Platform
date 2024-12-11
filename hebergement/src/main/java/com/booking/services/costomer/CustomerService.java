package com.booking.services.costomer;

import com.booking.dto.*;
import com.booking.entity.BookAHost;

import java.io.IOException;
import java.util.List;

public interface CustomerService {

    List<HostDto> getAllHosts();

    List<HostDto> searchHostByType(String type);

    boolean bookAHost(BookAHostDto bookAHostDto);

    HostDto getHostById(long hostId);

    List<BookAHostDto> getBookingsByUserId(Long userId);

    boolean giveReview(ReviewDto reviewDto);

    List<ReviewDto> getReviewByHostId(Long hostId);

    boolean contactAdmin(ContactDto contactDto);

    boolean updateUser(Long id, UserDto userDto) throws IOException;

    List<ResponseContactDto> getContactByUserId(Long userId);

    void deleteMessages(Long id);

    List<UserDto> getProfileByUserId(Long id);

    UserDto getProfById(Long id);

    BookAHostDto getBookById(long bookId);

    boolean addMoney(MoneyDto moneyDto);

    boolean addPayment(PaymentDto paymentDto);
}
