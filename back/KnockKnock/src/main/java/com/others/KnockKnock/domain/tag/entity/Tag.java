package com.others.KnockKnock.domain.tag.entity;

import com.others.KnockKnock.domain.schedule.entity.Schedule;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
@Builder(toBuilder = true)
@Table(name = "TAGS")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    private String name;
    private String color;

    @ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST })
    @JoinColumn(name = "SCHEDULE_ID")
    private Schedule schedule;

    public void addCalendar(Schedule schedule) {
        this.schedule = schedule;

        if (!schedule.getTag().contains(this))
            schedule.getTag().add(this);
    }

    public void updateCalendar(Schedule schedule) {
        if (this.schedule != null)
            this.schedule.getTag().remove(this);

        this.schedule = schedule;
        schedule.getTag().add(this);
    }

    public void removeCalendar() {
        if (this.schedule != null) {
            this.schedule.getTag().remove(this);
            this.schedule = null;
        }
    }
}
