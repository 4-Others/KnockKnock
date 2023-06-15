package com.others.KnockKnock.domain.calendar.entity;

import com.others.KnockKnock.audit.Auditable;
import com.others.KnockKnock.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder(toBuilder = true)
@Table(name = "Calendar")
public class Calendar extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long calendarId;

    private String title;
    private String content;

    @Enumerated(EnumType.STRING)
    private Period period;

    private String startAt;
    private String endAt;

    private Boolean confirm;

    @ElementCollection
    @CollectionTable(name = "calendar_alerts", joinColumns = @JoinColumn(name = "calendar_id"))
    @Column(name = "alerts")
    private List<Integer> alerts;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public enum Period {
        ALL_DAY,
        SPECIFIC_TIME
        ;
    }
}
