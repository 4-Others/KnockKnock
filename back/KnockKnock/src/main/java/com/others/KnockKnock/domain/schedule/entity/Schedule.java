package com.others.KnockKnock.domain.schedule.entity;

import com.others.KnockKnock.audit.Auditable;
import com.others.KnockKnock.domain.tag.entity.Tag;
import com.others.KnockKnock.domain.user.entity.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder(toBuilder = true)
@Table(name = "SCHEDULE")
public class Schedule extends Auditable implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    private String title;
    private String content;

    @Enumerated(EnumType.STRING)
    private Period period;

    private String startAt;
    private String endAt;

    private Boolean complete;

    @ElementCollection
    @CollectionTable(name = "SCHEDULE_ALERTS", joinColumns = @JoinColumn(name = "SCHEDULE_ID"))
    @Column(name = "ALERTS")
    private List<Integer> alerts;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST })
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    public enum Period {
        ALL_DAY,
        SPECIFIC_TIME
        ;
    }
}
