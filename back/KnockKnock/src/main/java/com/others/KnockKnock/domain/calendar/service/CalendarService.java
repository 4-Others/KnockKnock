package com.others.KnockKnock.domain.calendar.service;

import com.others.KnockKnock.domain.calendar.dto.CalendarDto;
import com.others.KnockKnock.domain.calendar.entity.Calendar;
import com.others.KnockKnock.domain.calendar.entity.Calendar.Period;
import com.others.KnockKnock.domain.calendar.mapper.CalendarMapper;
import com.others.KnockKnock.domain.calendar.repository.CalendarRepository;
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

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final UserRepository userRepository;
    private final CalendarRepository calendarRepository;
    private final CalendarMapper calendarMapper;

    private final NotificationService notificationService;
    private final TagService tagService;

    public CalendarDto.Response createCalendar(Long userId, CalendarDto.Post requestBody) {
        Optional<User> byEmail = userRepository.findByEmail("tester@tester.com");
        User user = byEmail.get();

        Calendar createCalendar = Calendar.builder()
                                      .user(user)
                                      .title(requestBody.getTitle())
                                      .period(Period.valueOf(requestBody.getPeriod()))
                                      .content(requestBody.getContent())
                                      .startAt(requestBody.getStartAt())
                                      .endAt(requestBody.getEndAt())
                                      .alerts(requestBody.getAlerts())
                                      .tag(new ArrayList<>())
                                      .build();

        Calendar createdCalendar = calendarRepository.save(createCalendar);

        tagService.createTag(createdCalendar, requestBody.getTag());
        notificationService.createNotifications(createdCalendar);

        return calendarMapper.calendarToCalendarDtoResponse(createdCalendar);
    }

    public CalendarDto.Response updateCalendar(Long userId, Long calendarId, CalendarDto.Patch requestBody) {
        Calendar byCalendarIdAndUserId = findByCalendarIdAndUserId(userId, calendarId);
        Calendar createCalendar = Calendar.builder()
                                      .title(requestBody.getTitle())
                                      .period(Period.valueOf(requestBody.getPeriod()))
                                      .content(requestBody.getContent())
                                      .startAt(requestBody.getStartAt())
                                      .endAt(requestBody.getEndAt())
                                      .alerts(requestBody.getAlerts())
                                      .tag(new ArrayList<>())
                                      .build();

        Calendar mergedCalendar = mergeCalendarInfo(byCalendarIdAndUserId, createCalendar);
        Calendar updatedCalendar = calendarRepository.save(mergedCalendar);

        tagService.updateTag(updatedCalendar, requestBody.getTag());
        notificationService.updateNotifications(updatedCalendar);

        return calendarMapper.calendarToCalendarDtoResponse(updatedCalendar);
    }

    public void deleteCalendar(Long userId, Long calendarId) {
        Calendar byCalendarIdAndUserId = findByCalendarIdAndUserId(userId, calendarId);

        calendarRepository.delete(byCalendarIdAndUserId);
    }

    public List<CalendarDto.Response> findByUserIdAndStartAtLike(Long userId, String startAt) {
        List<Calendar> byUserIdAndDate = calendarRepository.findByUserIdAndStartAtLike(userId, startAt);

        return calendarMapper.calendarListToCalendarDtoResponseList(byUserIdAndDate);
    }

    @Transactional(readOnly = true)
    public Calendar findByCalendarIdAndUserId(Long userId, Long calendarId) {
        Optional<Calendar> byCalendarId = calendarRepository.findByCalendarIdAndUserId(userId, calendarId);

        return byCalendarId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND));
    }

    public Calendar mergeCalendarInfo(Calendar destination, Calendar source) {
        if (destination == null || source == null) {
            return null;
        }

        return Optional.of(destination)
                   .map(dest -> {
                           Calendar build = dest.toBuilder()
                                                .title(source.getTitle() != null ? source.getTitle() : dest.getTitle())
                                                .period(source.getPeriod() != null ? source.getPeriod() : dest.getPeriod())
                                                .content(source.getContent() != null ? source.getContent() : dest.getContent())
                                                .startAt(source.getStartAt() != null ? source.getStartAt() : dest.getStartAt())
                                                .endAt(source.getEndAt() != null ? source.getEndAt() : dest.getEndAt())
                                                .alerts(source.getAlerts() != null ? source.getAlerts() : dest.getAlerts())
                                                .tag(new ArrayList<>())
                                                .build();

                           build.setCreatedAt(dest.getCreatedAt());

                           return build;
                       }
                   )
                   .orElse(null);
    }
}
