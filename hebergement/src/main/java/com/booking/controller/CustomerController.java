package com.booking.controller;

import com.booking.dto.*;
import com.booking.services.costomer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/customer")
@RequiredArgsConstructor
public class CustomerController {


    private final CustomerService customerService;

    @GetMapping("/hosts")
    public ResponseEntity<List<HostDto>> getAllHosts(){
        List<HostDto> hostDtoList = customerService.getAllHosts();
        return ResponseEntity.ok(hostDtoList);
    }

    @GetMapping("/search/{type}")
    public ResponseEntity<?> searchHostByService(@PathVariable String type){
        return ResponseEntity.ok(customerService.searchHostByType(type));
    }


    @PostMapping("/host/book")
    public ResponseEntity<Void> bookAHost(@RequestBody BookAHostDto bookAHostDto){
        boolean success = customerService.bookAHost(bookAHostDto);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

    @GetMapping("/host/{hostId}")
    public ResponseEntity<HostDto> getHostById(@PathVariable Long hostId){
        HostDto hostDto = customerService.getHostById(hostId);
        if (hostDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(hostDto);
    }

    @GetMapping("/host/bookings/{userId}")
    public ResponseEntity<List<BookAHostDto>> getBookingsByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(customerService.getBookingsByUserId(userId));
    }

    @PostMapping("/review")
    public ResponseEntity<?> giveReview(@RequestBody ReviewDto reviewDto){
        boolean success = customerService.giveReview(reviewDto);
        if (success){
            return ResponseEntity.status(HttpStatus.OK).build();
        }else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/review/{hostId}")
    public ResponseEntity<List<ReviewDto>> getReviewByHostId(@PathVariable Long hostId){
        return ResponseEntity.ok(customerService.getReviewByHostId(hostId));
    }

    @PostMapping("/host/contact")
    public ResponseEntity<Void> contactAdmin(@RequestBody ContactDto contactDto){
        boolean success = customerService.contactAdmin(contactDto);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

    @PutMapping("/user/{id}")
    public ResponseEntity<Void> updateUser(@PathVariable Long id, @ModelAttribute UserDto userDto) throws IOException {
        try {
            boolean success = customerService.updateUser(id, userDto);
            if (success) return ResponseEntity.status(HttpStatus.OK).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/contact/messages/{userId}")
    public ResponseEntity<List<ResponseContactDto>> getContactByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(customerService.getContactByUserId(userId));
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> deleteMessages(@PathVariable Long id){
        customerService.deleteMessages(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/user/profile/{id}")
    public ResponseEntity<List<UserDto>> getProfileByUserId(@PathVariable Long id){
        return ResponseEntity.ok(customerService.getProfileByUserId(id));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<UserDto> getProfById(@PathVariable Long id) {
        UserDto userDto = customerService.getProfById(id);
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<BookAHostDto> getBookById(@PathVariable Long bookId){
        BookAHostDto bookAHostDto = customerService.getBookById(bookId);
        if (bookAHostDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(bookAHostDto);
    }

    @PostMapping("/host/money")
    public ResponseEntity<Void> addMoney(@RequestBody MoneyDto moneyDto){
        boolean success = customerService.addMoney(moneyDto);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

    @PostMapping("/host/payment")
    public ResponseEntity<Void> addPayment(@RequestBody PaymentDto paymentDto){
        boolean success = customerService.addPayment(paymentDto);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }
}
