package com.others.KnockKnock.domain.mail.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

import javax.persistence.*;

//@RedisHash(value = "EmailConfirmRandomKey")
@Entity
@Table(name = "EMAIL_CONFIRM_RANDOM")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmailConfirmRandomKey {
    @Id
    private String email;
    @Column
    private String randomKey;

    @TimeToLive
    @Column
    private Long expiration;
}

