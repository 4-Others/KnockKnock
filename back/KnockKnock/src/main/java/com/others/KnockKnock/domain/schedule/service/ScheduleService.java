package com.others.KnockKnock.domain.schedule.service;

import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import com.others.KnockKnock.domain.schedule.entity.Schedule;
import com.others.KnockKnock.domain.schedule.mapper.ScheduleMapper;
import com.others.KnockKnock.domain.schedule.repository.ScheduleRepository;
import com.others.KnockKnock.domain.notification.service.NotificationService;
import com.others.KnockKnock.domain.tag.entity.Tag;
import com.others.KnockKnock.domain.tag.service.TagService;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.exception.BusinessLogicException;
import com.others.KnockKnock.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.others.KnockKnock.domain.schedule.entity.Schedule.*;

@Service
@RequiredArgsConstructor
public class ScheduleService {
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleMapper scheduleMapper;

    private final NotificationService notificationService;
    private final TagService tagService;

    DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public ScheduleDto.Response createSchedule(Long userId, ScheduleDto.Post requestBody) {
        Optional<User> byEmail = userRepository.findByUserId(userId);
        User user = byEmail.get();

        ScheduleBuilder scheduleBuilder = builder()
                                    .title(requestBody.getTitle())
                                    .period(Period.valueOf(requestBody.getPeriod()))
                                    .content(requestBody.getContent())
                                    .startAt(LocalDateTime.parse(requestBody.getStartAt(), timeFormatter))
                                    .endAt(LocalDateTime.parse(requestBody.getEndAt(), timeFormatter))
                                    .alerts(requestBody.getAlerts())
                                    .complete(requestBody.getComplete())
                                    .user(user);

        Schedule buildSchedule;

        if (requestBody.getTagId() != null) {
            Tag findTag = tagService.findTagByUserIdAndTagId(userId, requestBody.getTagId());
            buildSchedule = scheduleBuilder.tag(findTag).build();
        } else {
            buildSchedule = scheduleBuilder.build();
        }

        Schedule createdSchedule = scheduleRepository.save(buildSchedule);

        notificationService.createNotifications(createdSchedule);

        return scheduleMapper.scheduleToScheduleDtoResponse(createdSchedule);
    }

    public ScheduleDto.Response updateSchedule(Long userId, Long scheduleId, ScheduleDto.Patch requestBody) {
        Schedule findSchedule = findScheduleByUserIdAndScheduleId(userId, scheduleId);
        ScheduleBuilder scheduleBuilder = builder()
                                       .title(requestBody.getTitle())
                                       .period(Period.valueOf(requestBody.getPeriod()))
                                       .content(requestBody.getContent())
                                       .startAt(requestBody.getStartAt() != null
                                                    ? LocalDateTime.parse(requestBody.getStartAt(), timeFormatter)
                                                    : findSchedule.getStartAt()
                                       )
                                       .endAt(requestBody.getEndAt() != null
                                                  ? LocalDateTime.parse(requestBody.getEndAt(), timeFormatter)
                                                  : findSchedule.getEndAt()
                                       )
                                       .alerts(requestBody.getAlerts())
                                       .complete(requestBody.getComplete());

        Schedule buildSchedule;

        if (requestBody.getTagId() != null) {
            Tag findTag = tagService.findTagByUserIdAndTagId(userId, requestBody.getTagId());
            buildSchedule = scheduleBuilder.tag(findTag).build();
        } else {
            buildSchedule = scheduleBuilder.build();
        }

        Schedule mergedSchedule = mergeScheduleInfo(findSchedule, buildSchedule);
        Schedule updatedSchedule = scheduleRepository.save(mergedSchedule);

        notificationService.updateNotifications(updatedSchedule);

        return scheduleMapper.scheduleToScheduleDtoResponse(updatedSchedule);
    }

    public void deleteSchedule(Long userId, Long scheduleId) {
        Schedule byScheduleIdAndUserId = findScheduleByUserIdAndScheduleId(userId, scheduleId);

        scheduleRepository.delete(byScheduleIdAndUserId);
    }
    public void deleteAllScheduleByTagId(Long tagId){
        List<Schedule> schedules = scheduleRepository.findAllByTagId(tagId);
        scheduleRepository.deleteAll(schedules);
    }

    public List<ScheduleDto.Response> findAllSchedule(Long userId) {
        List<Schedule> schedules = scheduleRepository.findAllByUserId(userId);

        return scheduleMapper.scheduleListToScheduleDtoResponseList(schedules);
    }

    public List<ScheduleDto.Response> findScheduleByTitleAndStartAtLikeEndAtLike(
        Long userId,
        String keyword,
        String startAt,
        String endAt
    ) {
        List<Schedule> schedules;

        if (startAt != null && endAt != null) {
            schedules = scheduleRepository.findScheduleByTitleAndBetweenDate(
                userId,
                keyword,
                LocalDateTime.parse(startAt, timeFormatter),
                LocalDateTime.parse(endAt, timeFormatter)
            );
        } else {
            schedules = scheduleRepository.findScheduleByTitleLike(userId, keyword);
        }

        return scheduleMapper.scheduleListToScheduleDtoResponseList(schedules);
    }

    @Transactional(readOnly = true)
    public Schedule findScheduleByUserIdAndScheduleId(Long userId, Long calendarId) {
        Optional<Schedule> byCalendarId = scheduleRepository.findScheduleByUserIdAndScheduleId(userId, calendarId);

        return byCalendarId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }

    public Schedule mergeScheduleInfo(Schedule destination, Schedule source) {
        if (destination == null || source == null) {
            return null;
        }

        return Optional.of(destination)
                   .map(dest -> {
                           Schedule build = dest.toBuilder()
                                                .title(source.getTitle() != null ? source.getTitle() : dest.getTitle())
                                                .period(source.getPeriod() != null ? source.getPeriod() : dest.getPeriod())
                                                .content(source.getContent() != null ? source.getContent() : dest.getContent())
                                                .startAt(source.getStartAt() != null ? source.getStartAt() : dest.getStartAt())
                                                .endAt(source.getEndAt() != null ? source.getEndAt() : dest.getEndAt())
                                                .alerts(source.getAlerts() != null ? source.getAlerts() : dest.getAlerts())
                                                .complete(source.getComplete() != null ? source.getComplete() : dest.getComplete())
                                                .tag(source.getTag() != null ? source.getTag() : dest.getTag())
                                                .build();

                           build.setCreatedAt(dest.getCreatedAt());

                           return build;
                       }
                   )
                   .orElse(null);
    }
}
