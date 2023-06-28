package com.others.KnockKnock.domain.tag.entity;

import com.others.KnockKnock.domain.calendar.entity.Calendar;
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
    @JoinColumn(name = "CALENDAR_ID")
    private Calendar calendar;

    public void addCalendar(Calendar calendar) {
        this.calendar = calendar;

        if (!calendar.getTag().contains(this))
            calendar.getTag().add(this);
    }

    public void updateCalendar(Calendar calendar) {
        if (this.calendar != null)
            this.calendar.getTag().remove(this);

        this.calendar = calendar;
        calendar.getTag().add(this);
    }

    public void removeCalendar() {
        if (this.calendar != null) {
            this.calendar.getTag().remove(this);
            this.calendar = null;
        }
    }
}
