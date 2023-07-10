package com.others.KnockKnock.domain.schedule.repository;

import com.others.KnockKnock.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT s FROM Schedule s where s.user.userId = :userId and s.scheduleId = :scheduleId")
    Optional<Schedule> findByScheduleIdAndUserId(Long userId, Long scheduleId);

    @Query("SELECT s FROM Schedule s WHERE s.user.userId = :userId AND s.startAt LIKE CONCAT(:date, '%')")
    List<Schedule> findByUserIdAndStartAtLike(Long userId, String date);

    @Query("SELECT s FROM Schedule s where s.user.userId = :userId")
    List<Schedule> findAllByUserId(Long userId);

    // select * from schedule s join tags t on t.schedule_id = s.schedule_id where s.user_id = 1 and t.name = 'tag-modi';
    @Query("SELECT s FROM Schedule s join s.tag t where s.user.userId = :userId and t.name = :tagName")
    List<Schedule> findAllByUserIdAndTagName(Long userId, String tagName);
}
