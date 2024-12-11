package com.booking.repository;

import com.booking.dto.BookAHostDto;
import com.booking.entity.BookAHost;
import com.booking.entity.Host;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookAHostRepository extends JpaRepository<BookAHost, Long> {
    List<BookAHost> findAllByUserId(Long userId);

    boolean existsByHostAndFromDateLessThanEqualAndToDateGreaterThanEqual(Host host, Date fromDate, Date toDate);
}

