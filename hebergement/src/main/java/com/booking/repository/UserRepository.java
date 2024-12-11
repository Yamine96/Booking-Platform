package com.booking.repository;

import com.booking.entity.ResponseContact;
import com.booking.entity.User;
import com.booking.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findFirstByEmail(String email);

    User findByUserRole(UserRole userRole);

    List<User> findProfileById(Long id);
}
