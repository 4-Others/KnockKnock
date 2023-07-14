package com.others.KnockKnock.audit;

import com.others.KnockKnock.utils.DateUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable {
    @CreatedDate
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt;

    @LastModifiedDate
    @Column(name = "modifiedAt")
    private String modifiedAt;

    @PrePersist
    public void onPrePersist() {
        this.createdAt = DateUtil.convertLocalDateTimeToFormatString(LocalDateTime.now());
        this.modifiedAt = this.createdAt;
    }

    @PreUpdate
    public void onPreUpdate() {
        this.modifiedAt = DateUtil.convertLocalDateTimeToFormatString(LocalDateTime.now());
    }
}
