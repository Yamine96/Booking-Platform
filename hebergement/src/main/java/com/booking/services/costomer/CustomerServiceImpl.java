package com.booking.services.costomer;

import com.booking.dto.*;
import com.booking.entity.*;
import com.booking.enums.BookHostStatus;
import com.booking.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {


    private final HostRepository hostRepository;

    private final UserRepository userRepository;

    private final BookAHostRepository bookAHostRepository;

    private final ReviewRepository reviewRepository;

    private final ContactRepository contactRepository;

    private final ResponseRepository responseRepository;

    private final MoneyRepository moneyRepository;

    private final PaymentRepository paymentRepository;

    public List<HostDto> getAllHosts() {
        return hostRepository.findAll().stream().map(Host::getHostDto).collect(Collectors.toList());
    }

    public List<HostDto> searchHostByType(String type){
        return hostRepository.findAllByType(type).stream().map(Host::getHostDto).collect(Collectors.toList());
    }

    public boolean bookAHost(BookAHostDto bookAHostDto){
        Optional<Host> optionalHost = hostRepository.findById(bookAHostDto.getHostId());
        Optional<User> optionalUser = userRepository.findById(bookAHostDto.getUserId());

        if (optionalHost.isPresent() && optionalUser.isPresent()) {
            Host existingHost = optionalHost.get();

            if (bookAHostRepository.existsByHostAndFromDateLessThanEqualAndToDateGreaterThanEqual(existingHost, bookAHostDto.getFromDate(), bookAHostDto.getToDate())) {
                return false; // Conflict found
            }

            BookAHost bookAHost = new BookAHost();

            bookAHost.setUser(optionalUser.get());
            bookAHost.setHost(existingHost);
            bookAHost.setBookHostStatus(BookHostStatus.PENDING);
            bookAHost.setFromDate(bookAHostDto.getFromDate());
            bookAHost.setToDate(bookAHostDto.getToDate());
            long val = bookAHostDto.getToDate().getTime() - bookAHostDto.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(val);
            bookAHost.setDays(days);
            bookAHost.setPrice(existingHost.getPrice() * days);

            bookAHostRepository.save(bookAHost);
            return true;
        }
        return false;
    }

    @Override
    public HostDto getHostById(long hostId) {
        Optional<Host> optionalHost = hostRepository.findById(hostId);
        return optionalHost.map(Host::getHostDto).orElse(null);
    }

    @Override
    public List<BookAHostDto> getBookingsByUserId(Long userId) {
        return bookAHostRepository.findAllByUserId(userId).stream().map(BookAHost::getBookAHostDto).collect(Collectors.toList());
    }


    public boolean giveReview(ReviewDto reviewDto) {
        Optional<User> optionalUser = userRepository.findById(reviewDto.getUserId());
        Optional<BookAHost> optionalBookAHost = bookAHostRepository.findById(reviewDto.getBookId());

        if (optionalBookAHost.isPresent() && optionalUser.isPresent()) {
            Review review = new Review();

            review.setReviewDate(new Date());
            review.setReview(reviewDto.getReview());
            review.setRating(reviewDto.getRating());

            review.setUser(optionalUser.get());
            review.setHost(optionalBookAHost.get().getHost());

            reviewRepository.save(review);

            return true;

        }
        return false;
    }

    @Override
    public List<ReviewDto> getReviewByHostId(Long hostId) {
        return reviewRepository.findAllByHostId(hostId).stream().map(Review::getReviewDto).collect(Collectors.toList());
    }

    @Override
    public boolean contactAdmin(ContactDto contactDto) {
        Optional<User> optionalUser = userRepository.findById(contactDto.getUserId());

        if (optionalUser.isPresent()) {
            Contact contact = new Contact();

            contact.setUser(optionalUser.get());
            contact.setSubject(contactDto.getSubject());
            contact.setMessage(contactDto.getMessage());
            contact.setName(optionalUser.get().getName());
            contact.setEmail(optionalUser.get().getEmail());

            contactRepository.save(contact);
            return true;
        }
        return false;
    }

    @Override
    public boolean updateUser(Long id, UserDto userDto) throws IOException {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setVille(userDto.getVille());
            existingUser.setTel(userDto.getTel());
            userRepository.save(existingUser);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<ResponseContactDto> getContactByUserId(Long userId) {
        return responseRepository.findAllByUserId(userId).stream().map(ResponseContact::getResponseDto).collect(Collectors.toList());
    }

    @Override
    public void deleteMessages(Long id) {
        responseRepository.deleteById(id);
    }

    @Override
    public List<UserDto> getProfileByUserId(Long id) {
        return userRepository.findProfileById(id).stream().map(User::getAllUsersDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getProfById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        return optionalUser.map(User::getAllUsersDto).orElse(null);
    }

    @Override
    public BookAHostDto getBookById(long bookId) {
        Optional<BookAHost> optionalBookAHost = bookAHostRepository.findById(bookId);
        return optionalBookAHost.map(BookAHost::getBookAHostDto).orElse(null);
    }

    @Override
    public boolean addMoney(MoneyDto moneyDto) {
        Optional<User> optionalUser = userRepository.findById(moneyDto.getUserId());

        if (optionalUser.isPresent()) {
            Money money = new Money();

            money.setUser(optionalUser.get());
            money.setCash(moneyDto.getCash());

            moneyRepository.save(money);
            return true;
        }
        return false;
    }

    @Override
    public boolean addPayment(PaymentDto paymentDto) {
        Optional<BookAHost> optionalBookAHost = bookAHostRepository.findById(paymentDto.getBookId());
        Optional<User> optionalUser = userRepository.findById(paymentDto.getUserId());

        if (optionalBookAHost.isPresent() && optionalUser.isPresent()) {
            BookAHost existingHost = optionalBookAHost.get();
            User existingUser = optionalUser.get();
            Payment payment = new Payment();

            payment.setBookAHost(existingHost);
            payment.setUser(existingUser);
            payment.setCardHolder(paymentDto.getCardHolder());
            payment.setCardNumber(paymentDto.getCardNumber());
            payment.setExpiryDate(paymentDto.getExpiryDate());
            payment.setCvv(paymentDto.getCvv());

            paymentRepository.save(payment);
            return true;
        }
        return false;
    }


}
