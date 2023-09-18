package com.others.KnockKnock.domain.notification.entity;

import com.others.KnockKnock.audit.Auditable;
import com.others.KnockKnock.domain.schedule.entity.Schedule;
import com.others.KnockKnock.domain.user.entity.User;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder(toBuilder = true)
@Table(name = "NOTIFICATIONS")
public class Notification extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    private String title;
    private String notifyAt;

    @Setter
    private Boolean delivered;
    @Setter
    private Boolean read;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SCHEDULE_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;
}
