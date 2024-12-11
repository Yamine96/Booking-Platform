package com.booking.services.admin;

import com.booking.dto.*;
import com.booking.entity.*;
import com.booking.enums.BookHostStatus;
import com.booking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final HostRepository hostRepository;

    private final BookAHostRepository bookAHostRepository;

    private final UserRepository userRepository;

    private final ReviewRepository reviewRepository;

    private final ContactRepository contactRepository;

    private final ResponseRepository responseRepository;

    private final VoitureRepository voitureRepository;

    @Override
    public boolean postHost(HostDto hostDto) throws IOException {
        try {
            Host host = new Host();
            host.setType(hostDto.getType());
            host.setDescription(hostDto.getDescription());
            host.setLocation(hostDto.getLocation());
            host.setPrice(hostDto.getPrice());
            host.setImage(hostDto.getImage().getBytes());
            host.setVideo(hostDto.getVideo().getBytes());
            hostRepository.save(host);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    @Override
    public List<HostDto> getAllHosts() {
        return hostRepository.findAll().stream().map(Host::getHostDto).collect(Collectors.toList());
    }

    @Override
    public void deleteHost(Long id) {
        hostRepository.deleteById(id);
    }

    @Override
    public HostDto getHostById(Long id) {
        Optional<Host> optionalHost = hostRepository.findById(id);
        return optionalHost.map(Host::getHostDto).orElse(null);
    }

    @Override
    public boolean updateHost(Long hostId, HostDto hostDto) throws IOException {
        Optional<Host> optionalHost = hostRepository.findById(hostId);
        if (optionalHost.isPresent()) {
            Host existingHost = optionalHost.get();
            if (hostDto.getImage() != null)
                existingHost.setImage(hostDto.getImage().getBytes());
            if (hostDto.getVideo() != null && !hostDto.getVideo().isEmpty())
                existingHost.setVideo(hostDto.getVideo().getBytes());
            existingHost.setType(hostDto.getType());
            existingHost.setDescription(hostDto.getDescription());
            existingHost.setLocation(hostDto.getLocation());
            existingHost.setPrice(hostDto.getPrice());
            hostRepository.save(existingHost);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<BookAHostDto> getBookings() {
        return bookAHostRepository.findAll().stream().map(BookAHost::getBookAHostDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<BookAHost> optionalBookAHost = bookAHostRepository.findById(bookingId);
        if (optionalBookAHost.isPresent()) {
            BookAHost existingBookAHost = optionalBookAHost.get();
            if (Objects.equals(status, "Approve"))
                existingBookAHost.setBookHostStatus(BookHostStatus.APPROVED);
            else
                existingBookAHost.setBookHostStatus(BookHostStatus.REJECTED);
            bookAHostRepository.save(existingBookAHost);
            return true;
        }
        return false;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(User::getAllUsersDto).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<ReviewDto> getAllReview() {
        return reviewRepository.findAll().stream().map(Review::getReviewDto).collect(Collectors.toList());
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    @Override
    public List<ContactDto> getAllContact() {
        return contactRepository.findAll().stream().map(Contact::getContactDto).collect(Collectors.toList());
    }

    @Override
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    @Override
    public ContactDto getContactById(long contactId) {
        Optional<Contact> optionalContact = contactRepository.findById(contactId);
        return optionalContact.map(Contact::getContactDto).orElse(null);
    }

    @Override
    public boolean AddResponse(ResponseContactDto responseContactDto) {
        Optional<Contact> optionalContact = contactRepository.findById(responseContactDto.getContactId());

        if (optionalContact.isPresent()) {
            Contact existingContact = optionalContact.get();
            ResponseContact responseContact = new ResponseContact();

            responseContact.setContact(existingContact);
            responseContact.setResponse(responseContactDto.getResponse());


            Optional<User> optionalUser = userRepository.findById(responseContactDto.getUserId());
            if (optionalUser.isPresent()) {
                responseContact.setUser(optionalUser.get());
            } else {

                return false;
            }

            responseRepository.save(responseContact);
            return true;
        }
        return false;
    }

    @Override
    public boolean postVoiture(VoitureDto voitureDto) throws IOException {
        try {
            Voiture voiture = new Voiture();
            voiture.setName(voitureDto.getName());
            voiture.setPrice(voitureDto.getPrice());
            voitureRepository.save(voiture);
            return true;
        }catch (Exception e){
            return false;
        }
    }

}
