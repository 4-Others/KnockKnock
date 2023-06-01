package com.others.KnockKnock.domain.calendar.repository;

import com.others.KnockKnock.domain.calendar.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    @Query("select c from Calendar c where c.user.userId = :userId and c.calendarId = :calendarId")
    Optional<Calendar> findByCalendarIdAndUserId(Long userId, Long calendarId);

    @Query("SELECT c FROM Calendar c WHERE c.user.userId = :userId AND c.startAt LIKE CONCAT(:date, '%')")
    List<Calendar> findByUserIdAndStartAtLike(Long userId, String date);
}
