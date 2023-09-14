package com.others.KnockKnock.security.config;

import com.others.KnockKnock.security.oauth.token.AuthTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
public class JwtConfig {
    private String secret;
    private final UserDetailsService userDetailsService;
    @Autowired
    public JwtConfig(@Value("${jwt.secret}")String secret, UserDetailsService userDetailsService) {
        this.secret = secret;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public AuthTokenProvider jwtProvider() {
        return new AuthTokenProvider(secret,userDetailsService);
    }
}

