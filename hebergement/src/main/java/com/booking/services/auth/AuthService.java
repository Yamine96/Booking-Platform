package com.booking.services.auth;

import com.booking.dto.SignupRequest;
import com.booking.dto.UserDto;

public interface AuthService {


    UserDto createCustomer(SignupRequest signupRequest);

    boolean hasCustomerWithEmail(String email);
}
