package com.others.KnockKnock.domain.notification.service;

import com.others.KnockKnock.domain.schedule.entity.Schedule;
import com.others.KnockKnock.domain.notification.dto.NotificationDto;
import com.others.KnockKnock.domain.notification.entity.Notification;
import com.others.KnockKnock.domain.notification.mapper.NotificationMapper;
import com.others.KnockKnock.domain.notification.repository.NotificationRepository;
import com.others.KnockKnock.utils.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import static com.others.KnockKnock.utils.DateUtil.convertLocalDateTimeToFormatString;
import static com.others.KnockKnock.utils.DateUtil.parseStringToLocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public void createNotifications(Schedule schedule) {
        List<Notification> notifications = genNotification(schedule);

        notificationRepository.saveAll(notifications);
    }

    public void updateNotifications(Schedule schedule) {
        List<Notification> allByUserIdAndCalendarId = notificationRepository
                                                          .findAllByUserIdAndCalendarId(
                                                            schedule.getUser().getUserId(),
                                                            schedule.getScheduleId()
                                                          );
        List<Notification> notDeliveredNotification = allByUserIdAndCalendarId.stream()
                                                          .filter(ntf -> !ntf.getDelivered())
                                                            .collect(Collectors.toList()
                                                          );

        deleteNotifications(notDeliveredNotification);

        List<Notification> notifications = genNotification(schedule);

        updateNotifications(notifications);
    }

    public void updateNotifications(List<Notification> notifications) {
        notificationRepository.saveAll(notifications);
    }

    public void deleteNotifications(List<Notification> notifications) {
        notificationRepository.deleteAll(notifications);
    }

    private List<Notification> genNotification(Schedule schedule) {
        return schedule.getAlerts().stream()
                   .map(alert -> {
                       LocalDateTime notifyAt = parseStringToLocalDateTime(schedule.getStartAt()).minusMinutes(alert);

                       return Notification.builder()
                                  .schedule(schedule)
                                  .user(schedule.getUser())
                                  .title(schedule.getTitle())
                                  .notifyAt(convertLocalDateTimeToFormatString(notifyAt))
                                  .delivered(false)
                                  .isRead(false)
                                  .build();
                   })
                   .collect(Collectors.toList());
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
                .map(sequence -> streamEventNotDelivered(
                    userId,
                    sequence,
                    DateUtil.convertLocalDateTimeToFormatString(
                        LocalDateTime.now().withSecond(0))
                    )
                );

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

    public List<NotificationDto.Response> updateReadStatus(Long userId, List<Long> notificationIds) {
        List<Notification> allNotificationByUserIdAndNotificationIds = notificationRepository.findAllByUserIdAndNotificationIds(userId, notificationIds);

        allNotificationByUserIdAndNotificationIds.forEach(ntf -> ntf.setIsRead(true));

        List<Notification> updatedNotifications = notificationRepository.saveAll(allNotificationByUserIdAndNotificationIds);

        return notificationMapper.notificationListToNotificationDtoResponseList(updatedNotifications);
    }

    public void deleteAllNotificationDelivered(Long userId, List<Long> notificationIds) {
        List<Notification> allByUserIdAndNotificationIdsAndDelivered = notificationRepository.findAllByUserIdAndNotificationIdsAndDelivered(userId, notificationIds);

        notificationRepository.deleteAll(allByUserIdAndNotificationIdsAndDelivered);
    }

    public List<NotificationDto.Response> findAllByUserIdAndDelivered(Long userId) {
        List<Notification> allByUserIdAndDelivered = notificationRepository.findAllByUserIdAndDelivered(userId);

        return notificationMapper.notificationListToNotificationDtoResponseList(allByUserIdAndDelivered);
    }

    public List<NotificationDto.Response> findAllByUserIdAndDeliveredButNotRead(Long userId) {
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
