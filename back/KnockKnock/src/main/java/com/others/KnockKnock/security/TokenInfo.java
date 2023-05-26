package com.others.KnockKnock.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class TokenInfo {
    private String grantType;   //JWT에대한 인증 타입
    private String accessToken;
    private String refreshToken;
}
