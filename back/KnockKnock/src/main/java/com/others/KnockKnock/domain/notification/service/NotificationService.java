package com.others.KnockKnock.domain.notification.service;

import com.others.KnockKnock.domain.calendar.entity.Calendar;
import com.others.KnockKnock.domain.notification.dto.NotificationDto;
import com.others.KnockKnock.domain.notification.entity.Notification;
import com.others.KnockKnock.domain.notification.mapper.NotificationMapper;
import com.others.KnockKnock.domain.notification.repository.NotificationRepository;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.yaml.snakeyaml.emitter.ScalarAnalysis;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.others.KnockKnock.utils.DateUtil.convertLocalDateTimeToFormatString;
import static com.others.KnockKnock.utils.DateUtil.parseStringToLocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public void createNotifications(Calendar calendar) {
        List<Notification> notifications =
            calendar.getAlerts().stream()
                .map(alert -> {
                    LocalDateTime notifyAt = parseStringToLocalDateTime(calendar.getStartAt()).minusMinutes(alert);

                    return Notification.builder()
                               .calendar(calendar)
                               .user(calendar.getUser())
                               .title(calendar.getTitle())
                               .notifyAt(convertLocalDateTimeToFormatString(notifyAt))
                               .delivered(false)
                               .read(false)
                               .build();
                })
                .collect(Collectors.toList());

        notificationRepository.saveAll(notifications);
    }

    public void updateNotifications(Calendar calendar) {
        List<Notification> allByUserIdAndCalendarId = notificationRepository.findAllByUserIdAndCalendarId(calendar.getUser().getUserId(), calendar.getCalendarId());
        List<String> alerts = calendar.getAlerts().stream()
                                  .map(alert -> convertLocalDateTimeToFormatString(parseStringToLocalDateTime(calendar.getStartAt()).minusMinutes(alert)))
                                  .collect(Collectors.toList());

        deleteNotifications(allByUserIdAndCalendarId);
        createNotifications(calendar);
    }

    public void deleteNotifications(List<Notification> notifications) {
        notificationRepository.deleteAll(notifications);
    }

    public List<NotificationDto.Response> updateReadStatus(Long userId, List<Long> notificationIds) {
        List<Notification> allNotificationByUserIdAndNotificationIds = notificationRepository.findAllByUserIdAndNotificationIds(userId, notificationIds);

        allNotificationByUserIdAndNotificationIds.forEach(ntf -> ntf.setRead(true));

        List<Notification> updatedNotifications = notificationRepository.saveAll(allNotificationByUserIdAndNotificationIds);

        return notificationMapper.notificationListToNotificationDtoResponseList(updatedNotifications);
    }

    public Flux<ServerSentEvent<List<NotificationDto.Response>>> genStreamEvent(Long userId) {
        Flux<ServerSentEvent<List<NotificationDto.Response>>> initialResult =
            Flux.defer(() -> Flux.just(streamEventDeliveredButNotRead(userId)));

        // * 정규: 정시마다 스트림 이벤트 방출
        // LocalDateTime now = LocalDateTime.now();
        // LocalDateTime nextHour = now.withMinute(0).withSecond(0).plusHours(1);
        // Duration delay = Duration.between(now, nextHour);
        // Flux<ServerSentEvent<List<NotificationDto.Response>>> recurringResults =
        //     Flux.interval(Duration.between(now, nextHour), Duration.ofHours(1))
        //         .map(sequence -> createPushNotificationEvent(userId, sequence));

        // * 정규: 1분마다 스트림 이벤트 방출
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nextMin = now.withSecond(0).plusSeconds(60);

        Flux<ServerSentEvent<List<NotificationDto.Response>>> recurringResults =
            Flux.interval(Duration.between(now, nextMin), Duration.ofSeconds(60))
                .map(sequence -> streamEventNotDelivered(userId, sequence, DateUtil.convertLocalDateTimeToFormatString(LocalDateTime.now().withSecond(0))));

        return Flux.concat(initialResult, recurringResults)
                   .publishOn(Schedulers.boundedElastic());
    }

    private ServerSentEvent<List<NotificationDto.Response>> streamEventDeliveredButNotRead(Long userId) {
        return ServerSentEvent.<List<NotificationDto.Response>>builder()
                   .id("NOT-READ")
                   .event("user-event-notification")
                   .data(findAllByUserIdAndDeliveredButNotRead(userId))
                   .build();
    }

    private ServerSentEvent<List<NotificationDto.Response>> streamEventNotDelivered(Long userId, Object sequence, String notifyAt) {
        return ServerSentEvent.<List<NotificationDto.Response>>builder()
                   .id(String.valueOf(sequence))
                   .event("user-event-notification")
                   .data(findAllByUserIdAndNotDelivered(userId, notifyAt))
                   .build();
    }

    private List<NotificationDto.Response> findAllByUserId(Long userId) {
        List<Notification> allNotificationByUserId = notificationRepository.findAllByUserId(userId);

        return notificationMapper.notificationListToNotificationDtoResponseList(allNotificationByUserId);
    }

    private List<NotificationDto.Response> findAllByUserIdAndDeliveredButNotRead(Long userId) {
        List<Notification> allNotificationByUserId = notificationRepository.findAllByUserIdAndDeliveredButNotRead(userId);

        return notificationMapper.notificationListToNotificationDtoResponseList(allNotificationByUserId);
    }

    public List<NotificationDto.Response> findAllByUserIdAndNotDelivered(Long userId, String notifyAt) {
        List<Notification> allNotificationByUserIdAndNotDelivered = notificationRepository.findAllByUserIdAndNotDelivered(userId, notifyAt);
        allNotificationByUserIdAndNotDelivered.forEach(ntf -> ntf.setDelivered(true));

        notificationRepository.saveAll(allNotificationByUserIdAndNotDelivered);

        return notificationMapper.notificationListToNotificationDtoResponseList(allNotificationByUserIdAndNotDelivered);
    }
}
