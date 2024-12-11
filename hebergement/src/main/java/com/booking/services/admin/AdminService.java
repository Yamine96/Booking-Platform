package com.booking.services.admin;

import com.booking.dto.*;

import java.io.IOException;
import java.util.List;


public interface AdminService {

    boolean postHost(HostDto hostDto) throws IOException;

    List<HostDto> getAllHosts();

    void deleteHost(Long id);

    HostDto getHostById(Long id);

    boolean updateHost(Long hostId, HostDto hostDto) throws IOException;

    List<BookAHostDto> getBookings();

    boolean changeBookingStatus(Long bookingId,String status);

    List<UserDto> getAllUsers();

    void deleteUser(Long id);

    List<ReviewDto> getAllReview();

    void deleteReview(Long id);

    List<ContactDto> getAllContact();

    void deleteContact(Long id);

    ContactDto getContactById(long contactId);

    boolean AddResponse(ResponseContactDto responseContactDto);

    boolean postVoiture(VoitureDto voitureDto) throws IOException;

}
