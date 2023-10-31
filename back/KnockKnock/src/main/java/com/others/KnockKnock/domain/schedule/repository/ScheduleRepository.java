package com.others.KnockKnock.domain.schedule.repository;

import com.others.KnockKnock.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT s FROM Schedule s where s.user.userId = :userId and s.scheduleId = :scheduleId")
    Optional<Schedule> findScheduleByUserIdAndScheduleId(Long userId, Long scheduleId);

    @Query(
        "SELECT s FROM Schedule s WHERE s.user.userId = :userId " +
            "AND s.title LIKE CONCAT('%', :keyword, '%')"
    )
    List<Schedule> findScheduleByTitleLike(Long userId, String keyword);

    @Query(
       "SELECT s FROM Schedule s WHERE s.user.userId = :userId " +
       "AND s.startAt <= :endAt " +
       "AND s.endAt >= :startAt " +
       "AND s.title LIKE CONCAT('%', :keyword, '%')"
    )
    List<Schedule> findScheduleByTitleAndBetweenDate(Long userId, String keyword, LocalDateTime startAt, LocalDateTime endAt);

    @Query("SELECT s FROM Schedule s where s.user.userId = :userId")
    List<Schedule> findAllByUserId(Long userId);
    @Query("SELECT s FROM Schedule s where s.tag.tagId = :tagId")
    List<Schedule> findAllByTagId(Long tagId);

    @Query("SELECT s FROM Schedule s join s.tag t where s.user.userId = :userId and t.name = :tagName")
    List<Schedule> findAllByUserIdAndTagName(Long userId, String tagName);
}
