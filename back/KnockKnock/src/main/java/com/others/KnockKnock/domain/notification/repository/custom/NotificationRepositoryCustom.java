package com.others.KnockKnock.domain.notification.repository.custom;

import com.others.KnockKnock.domain.notification.entity.Notification;

import java.util.List;

public interface NotificationRepositoryCustom {
    List<Notification> findAllByUserId(Long userId);
    List<Notification> findAllByUserIdAndCalendarId(Long userId, Long scheduleId);
    List<Notification> findAllByUserIdAndNotificationIds(Long userId, List<Long> notificationIds);
    List<Notification> findAllByUserIdAndNotificationIdsAndDelivered(Long userId, List<Long> notificationIds);
    List<Notification> findAllByUserIdAndDelivered(Long userId);
    List<Notification> findAllByUserIdAndDeliveredButNotRead(Long userId);
    List<Notification> findAllByUserIdAndNotDelivered(Long userId, String notifyAt);
}
