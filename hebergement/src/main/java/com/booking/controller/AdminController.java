package com.booking.controller;

import com.booking.dto.*;
import com.booking.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @PostMapping("/host")
    public ResponseEntity<?> postHost(@ModelAttribute HostDto hostDto) throws IOException {
        boolean success = adminService.postHost(hostDto);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/hosts")
    public ResponseEntity<?> getAllHosts(){
        return ResponseEntity.ok(adminService.getAllHosts());
    }

    @DeleteMapping("/host/{id}")
    public ResponseEntity<Void> deleteHost(@PathVariable Long id){
        adminService.deleteHost(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/host/{id}")
    public ResponseEntity<HostDto> getHostById(@PathVariable Long id) {
        HostDto hostDto = adminService.getHostById(id);
        return ResponseEntity.ok(hostDto);
    }

    @PutMapping("/host/{hostId}")
    public ResponseEntity<Void> updateHost(@PathVariable Long hostId, @ModelAttribute HostDto hostDto) throws IOException {
        try {
            boolean success = adminService.updateHost(hostId, hostDto);
            if (success) return ResponseEntity.status(HttpStatus.OK).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/host/bookings")
    public ResponseEntity<List<BookAHostDto>> getBookings() {
        return ResponseEntity.ok(adminService.getBookings());
    }

    @GetMapping("/host/booking/{bookingId}/{status}")
    public ResponseEntity<?> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status) {
        boolean success = adminService.changeBookingStatus(bookingId, status);
        if (success) return ResponseEntity.ok().build();
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/host/users")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        adminService.deleteUser(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/host/review")
    public ResponseEntity<List<ReviewDto>> getAllReview() {
        return ResponseEntity.ok(adminService.getAllReview());
    }

    @DeleteMapping("/review/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id){
        adminService.deleteReview(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/host/contacts")
    public ResponseEntity<List<ContactDto>> getAllContact() {
        return ResponseEntity.ok(adminService.getAllContact());
    }


    @DeleteMapping("/contacts/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id){
        adminService.deleteContact(id);
        return ResponseEntity.ok(null);
    }

    @GetMapping("/contact/{contactId}")
    public ResponseEntity<ContactDto> getContactById(@PathVariable Long contactId){
        ContactDto contactDto = adminService.getContactById(contactId);
        if (contactDto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(contactDto);
    }


    @PostMapping("/contact/response")
    public ResponseEntity<Void> AddResponse(@RequestBody ResponseContactDto responseContactDto){
        boolean success = adminService.AddResponse(responseContactDto);
        if (success) return ResponseEntity.status(HttpStatus.CREATED).build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();

    }

    @PostMapping("/host/voiture")
    public ResponseEntity<?> postVoiture(@ModelAttribute VoitureDto voitureDto) throws IOException{
        boolean success = adminService.postVoiture(voitureDto);
        if (success){
           return ResponseEntity.status(HttpStatus.CREATED).build();
        }else {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

}
