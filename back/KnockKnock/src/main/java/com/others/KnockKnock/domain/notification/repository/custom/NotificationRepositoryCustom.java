package com.others.KnockKnock.domain.notification.repository.custom;

import com.others.KnockKnock.domain.notification.entity.Notification;

import java.util.List;
import java.util.Optional;

public interface NotificationRepositoryCustom {
    Optional<Notification> findByPeriod(String period);
    List<Notification> findAllNotificationByUserId(Long userId);
    List<Notification> findAllNotificationByUserIdAndNotDelivered(Long userId);
}
