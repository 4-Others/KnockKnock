package com.others.KnockKnock.domain.notification.repository;

import com.others.KnockKnock.domain.notification.entity.Notification;
import com.others.KnockKnock.domain.notification.repository.custom.NotificationRepositoryCustom;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

import static com.others.KnockKnock.domain.notification.entity.QNotification.*;

public class NotificationRepositoryImpl implements NotificationRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    public NotificationRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Optional<Notification> findByPeriod(String period) {
        return Optional.ofNullable(
            queryFactory.selectFrom(notification)
                .where(notification.period.eq(period))
                .fetchFirst()
        );
    }

    @Override
    public List<Notification> findAllNotificationByUserId(Long userId) {
        return queryFactory.selectFrom(notification)
                .where(
                    userIdEq(userId)
                )
                .fetch();
    }

    @Override
    public List<Notification> findAllNotificationByUserIdAndNotDelivered(Long userId) {
        return queryFactory.selectFrom(notification)
                .where(
                    userIdEq(userId),
                    deliveredEq(false)
                )
                .fetch();
    }

    private BooleanExpression deliveredEq(boolean isDelivered) {
        return !isDelivered ? notification.delivered.eq(false) : null;
    }

    private BooleanExpression userIdEq(Long userId) {
        return userId != null ? notification.user.userId.eq(userId) : null;
    }
}
