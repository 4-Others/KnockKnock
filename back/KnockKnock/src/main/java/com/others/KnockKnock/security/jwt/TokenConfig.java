package com.others.KnockKnock.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TokenConfig {

    @Value("${token.expiration.access}")
    private long accessTokenExpirationMs;

    @Value("${token.expiration.refresh}")
    private long refreshTokenExpirationMs;

    public long getAccessTokenExpirationMs() {
        return accessTokenExpirationMs;
    }

    public long getRefreshTokenExpirationMs() {
        return refreshTokenExpirationMs;
    }
}
