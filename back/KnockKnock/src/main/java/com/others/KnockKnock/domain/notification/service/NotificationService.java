package com.others.KnockKnock.domain.notification.service;

import com.others.KnockKnock.domain.notification.dto.NotificationDto;
import com.others.KnockKnock.domain.notification.entity.Notification;
import com.others.KnockKnock.domain.notification.mapper.NotificationMapper;
import com.others.KnockKnock.domain.notification.repository.NotificationRepository;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.exception.BusinessLogicException;
import com.others.KnockKnock.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;

    public NotificationDto.Response createNotification(Notification notification, Long userId) {
        verifyExistNotification(notification.getPeriod());

        Optional<User> byUserId = userRepository.findByUserId(1L);
        User user = byUserId.get();

        Notification createdNotification = notificationRepository.save(
            Notification.builder()
                .title(notification.getTitle())
                .period(notification.getPeriod())
                .delivered(false)
                .read(false)
                .user(user)
                .build()
        );

        return notificationMapper.notificationToNotificationDtoResponse(createdNotification);
    }

    public Flux<ServerSentEvent<List<NotificationDto.Response>>> getNotification(Long userId) {
        return Flux.interval(Duration.ofSeconds(1))
            .publishOn(Schedulers.boundedElastic())
            .map(sequence -> ServerSentEvent.<List<NotificationDto.Response>>builder()
                                 .id(String.valueOf(sequence))
                                 .event("user-event-notification")
                                 .data(findAllNotificationByUserIdAndNotDelivered(userId))
                                 .build()
            );
    }

    private List<Notification> findAllNotificationByUserId(Long userId) {
        return notificationRepository.findAllNotificationByUserId(userId);
    }

    public List<NotificationDto.Response> findAllNotificationByUserIdAndNotDelivered(Long userId) {
        List<Notification> allNotificationByUserIdAndNotDelivered = notificationRepository.findAllNotificationByUserIdAndNotDelivered(userId);

        allNotificationByUserIdAndNotDelivered.forEach(ntf -> ntf.setDelivered(true));

        notificationRepository.saveAll(allNotificationByUserIdAndNotDelivered);

        return notificationMapper.notificationListToNotificationDtoResponseList(allNotificationByUserIdAndNotDelivered);
    }

    @Transactional(readOnly = true)
    public void verifyExistNotification(String period) {
        Optional<Notification> notificationByUserId = notificationRepository.findByPeriod(period);

        notificationByUserId.ifPresent((e) -> {
            throw new BusinessLogicException(ExceptionCode.ALREADY_EXISTS_INFORMATION);
        });
    }
}
