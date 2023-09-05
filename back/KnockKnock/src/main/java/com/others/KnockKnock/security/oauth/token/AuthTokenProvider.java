package com.others.KnockKnock.security.oauth.token;

import com.others.KnockKnock.security.oauth.exception.TokenValidFailedException;
import com.others.KnockKnock.security.oauth.service.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

/*
JWT 토큰 생성하고 변환하고, 유효성 검증함
 */
@Slf4j
public class AuthTokenProvider {
    private final UserDetailsService userDetailsService;

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";

    public AuthTokenProvider(String secret, UserDetailsService userDetailsService) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.userDetailsService = userDetailsService;

    }

    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, expiry, key);
    }

    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    public Authentication getAuthentication(AuthToken authToken) throws TokenValidFailedException {
        UserDetails userDetails = userDetailsService.loadUserByUsername(authToken.getTokenClaims().getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, authToken, userDetails.getAuthorities());
//        if(authToken.validate()) {
//
//            Claims claims = authToken.getTokenClaims();
//            Collection<? extends GrantedAuthority> authorities =
//                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
//                            .map(SimpleGrantedAuthority::new)
//                            .collect(Collectors.toList());
//
//            log.debug("claims subject := [{}]", claims.getSubject());
//            User principal = new User(claims.getSubject(), "", authorities);
//
//            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
//        } else {
//            throw new TokenValidFailedException();
//        }
    }
}

