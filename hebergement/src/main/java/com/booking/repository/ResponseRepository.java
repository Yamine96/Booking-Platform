package com.booking.repository;

import com.booking.entity.BookAHost;
import com.booking.entity.ResponseContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResponseRepository extends JpaRepository<ResponseContact,Long> {

    List<ResponseContact> findAllByUserId(Long userId);
}
