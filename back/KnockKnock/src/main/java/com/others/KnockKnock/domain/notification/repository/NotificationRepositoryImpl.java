package com.others.KnockKnock.domain.notification.repository;

import com.others.KnockKnock.domain.notification.entity.Notification;
import com.others.KnockKnock.domain.notification.repository.custom.NotificationRepositoryCustom;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.others.KnockKnock.domain.notification.entity.QNotification.*;

public class NotificationRepositoryImpl implements NotificationRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public NotificationRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Notification> findAllByUserId(Long userId) {
        return queryFactory.selectFrom(notification)
                   .where(
                       userIdEq(userId)
                   )
                   .fetch();
    }

    @Override
    public List<Notification> findAllByUserIdAndCalendarId(Long userId, Long scheduleId) {
        return queryFactory.selectFrom(notification)
                   .where(
                       userIdEq(userId),
                       scheduleIdEq(scheduleId)
                   )
                   .fetch();
    }

    @Override
    public List<Notification> findAllByUserIdAndNotificationIds(Long userId, List<Long> notificationIds) {
        return queryFactory.selectFrom(notification)
                   .where(
                       userIdEq(userId),
                       notificationIdIn(notificationIds)
                   )
                   .fetch();
    }

    @Override
    public List<Notification> findAllByUserIdAndNotificationIdsAndDelivered(Long userId, List<Long> notificationIds) {
        return queryFactory.selectFrom(notification)
                   .where(
                       userIdEq(userId),
                       deliveredEq(true),
                       notificationIdIn(notificationIds)
                   )
                   .fetch();
    }

    @Override
    public List<Notification> findAllByUserIdAndDelivered(Long userId) {
        return queryFactory.selectFrom(notification)
                   .where(
                       userIdEq(userId),
                       deliveredEq(true)
                   )
                   .fetch();
    }

    @Override
    public List<Notification> findAllByUserIdAndDeliveredButNotRead(Long userId) {
        return queryFactory.selectFrom(notification)
                .where(
                    userIdEq(userId),
                    deliveredEq(true),
                    readEq(false)
                )
                .fetch();
    }

    @Override
    public List<Notification> findAllByUserIdAndNotDelivered(Long userId, String notifyAt) {
        return queryFactory.selectFrom(notification)
                .where(
                    userIdEq(userId),
                    deliveredEq(false),
                    notifyAtEq(notifyAt)
                )
                .fetch();
    }

    private BooleanExpression notificationIdIn(List<Long> notificationIds) {
        return notificationIds.size() != 0 ? notification.notificationId.in(notificationIds) : null;
    }

    private BooleanExpression readEq(boolean read) {
        return notification.read.eq(read);
    }

    private BooleanExpression deliveredEq(boolean isDelivered) {
        return notification.delivered.eq(isDelivered);
    }

    private BooleanExpression userIdEq(Long userId) {
        return userId != null ? notification.user.userId.eq(userId) : null;
    }

    private BooleanExpression scheduleIdEq(Long scheduleId) {
        return scheduleId != null ? notification.schedule.scheduleId.eq(scheduleId) : null;
    }

    private BooleanExpression notifyAtEq(String notifyAt) {
        return notifyAt != null ? notification.notifyAt.eq(notifyAt) : null;
    }
}
