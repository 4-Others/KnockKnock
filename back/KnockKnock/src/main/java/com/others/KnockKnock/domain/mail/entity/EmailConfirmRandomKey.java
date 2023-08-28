package com.others.KnockKnock.domain.mail.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.*;

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
    @Column
    private Long expiration;
}

