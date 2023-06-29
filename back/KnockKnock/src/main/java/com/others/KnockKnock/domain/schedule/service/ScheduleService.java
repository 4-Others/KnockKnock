package com.others.KnockKnock.domain.schedule.service;

import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import com.others.KnockKnock.domain.schedule.entity.Schedule;
import com.others.KnockKnock.domain.schedule.mapper.ScheduleMapper;
import com.others.KnockKnock.domain.schedule.repository.ScheduleRepository;
import com.others.KnockKnock.domain.notification.service.NotificationService;
import com.others.KnockKnock.domain.tag.service.TagService;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.exception.BusinessLogicException;
import com.others.KnockKnock.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public ScheduleDto.Response createSchedule(Long userId, ScheduleDto.Post requestBody) {
        Optional<User> byEmail = userRepository.findByEmail("tester@tester.com");
        User user = byEmail.get();

        Schedule createSchedule = builder()
                                      .user(user)
                                      .title(requestBody.getTitle())
                                      .period(Period.valueOf(requestBody.getPeriod()))
                                      .content(requestBody.getContent())
                                      .startAt(requestBody.getStartAt())
                                      .endAt(requestBody.getEndAt())
                                      .alerts(requestBody.getAlerts())
                                      .complete(requestBody.getComplete())
                                      .tag(new ArrayList<>())
                                      .build();

        Schedule createdSchedule = scheduleRepository.save(createSchedule);

        tagService.createTag(createdSchedule, requestBody.getTag());
        notificationService.createNotifications(createdSchedule);

        return scheduleMapper.scheduleToScheduleDtoResponse(createdSchedule);
    }

    public ScheduleDto.Response updateSchedule(Long userId, Long calendarId, ScheduleDto.Patch requestBody) {
        Schedule byScheduleIdAndUserId = findByScheduleIdAndUserId(userId, calendarId);
        Schedule createSchedule = builder()
                                      .title(requestBody.getTitle())
                                      .period(Period.valueOf(requestBody.getPeriod()))
                                      .content(requestBody.getContent())
                                      .startAt(requestBody.getStartAt())
                                      .endAt(requestBody.getEndAt())
                                      .alerts(requestBody.getAlerts())
                                      .complete(requestBody.getComplete())
                                      .tag(new ArrayList<>())
                                      .build();

        Schedule mergedSchedule = mergeScheduleInfo(byScheduleIdAndUserId, createSchedule);
        Schedule updatedSchedule = scheduleRepository.save(mergedSchedule);

        tagService.updateTag(updatedSchedule, requestBody.getTag());
        notificationService.updateNotifications(updatedSchedule);

        return scheduleMapper.scheduleToScheduleDtoResponse(updatedSchedule);
    }

    public void deleteSchedule(Long userId, Long calendarId) {
        Schedule byScheduleIdAndUserId = findByScheduleIdAndUserId(userId, calendarId);

        scheduleRepository.delete(byScheduleIdAndUserId);
    }

    public List<ScheduleDto.Response> findByUserIdAndStartAtLike(Long userId, String startAt) {
        List<Schedule> byUserIdAndDate = scheduleRepository.findByUserIdAndStartAtLike(userId, startAt);

        return scheduleMapper.scheduleListToScheduleDtoResponseList(byUserIdAndDate);
    }

    @Transactional(readOnly = true)
    public Schedule findByScheduleIdAndUserId(Long userId, Long calendarId) {
        Optional<Schedule> byCalendarId = scheduleRepository.findByScheduleIdAndUserId(userId, calendarId);

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
                                                .tag(new ArrayList<>())
                                                .build();

                           build.setCreatedAt(dest.getCreatedAt());

                           return build;
                       }
                   )
                   .orElse(null);
    }
}
