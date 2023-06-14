package com.others.KnockKnock.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
public class TokenConfig {

    private long accessTokenExpirationMs=3600000;

    private long refreshTokenExpirationMs=86400000;

    public long getAccessTokenExpirationMs() {
        return accessTokenExpirationMs;
    }

    public long getRefreshTokenExpirationMs() {
        return refreshTokenExpirationMs;
    }

//    @Value("${token.expiration.access}")
//    private long accessTokenExpirationMs;
//
//    @Value("${token.expiration.refresh}")
//    private long refreshTokenExpirationMs;
}

