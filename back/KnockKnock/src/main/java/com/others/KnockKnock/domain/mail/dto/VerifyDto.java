package com.others.KnockKnock.domain.mail.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VerifyDto {
    private String tokenOrKey;
    private String email;
    private String password;
}
