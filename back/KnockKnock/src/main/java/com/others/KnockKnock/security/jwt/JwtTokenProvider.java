package com.others.KnockKnock.security.jwt;

import com.others.KnockKnock.security.jwt.TokenConfig;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expirationMs}")
    private int expirationMs;

    /**
     * 주어진 사용자 식별자를 기반으로 JWT 토큰을 생성합니다.
     *
     * @param email 사용자 식별자
     * @return 생성된 JWT 토큰
     */
//    public String generateToken(String email) {
//        Date now = new Date();
//        Date expiryDate = new Date(now.getTime() + expirationMs);
//
//        return Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(now)
//                .setExpiration(expiryDate)
//                .signWith(SignatureAlgorithm.HS512, secretKey)
//                .compact();
//    }
    public String[] generateToken(String email) {
        Date now = new Date();
        TokenConfig tokenConfig = new TokenConfig();
        long accessTokenExpirationMs = tokenConfig.getAccessTokenExpirationMs();
        long refreshTokenExpirationMs = tokenConfig.getRefreshTokenExpirationMs();
        Date accessTokenExpiration = new Date(now.getTime() + accessTokenExpirationMs);
        Date refreshTokenExpiration = new Date(now.getTime() + refreshTokenExpirationMs);

        // Access Token 생성
        String accessToken = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(accessTokenExpiration)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();

        // Refresh Token 생성
//        String refreshToken = Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(now)
//                .setExpiration(refreshTokenExpiration)
//                .signWith(SignatureAlgorithm.HS512, secretKey)
//                .compact();
        String refreshToken = Jwts.builder()
                .setSubject(email + "-refresh")
                .setIssuedAt(now)
                .setExpiration(refreshTokenExpiration)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();

        // Token 응답 생성
        //JwtTokenProvider.JwtAuthenticationResponse response = new JwtTokenProvider.JwtAuthenticationResponse(accessToken, refreshToken);
        return new String[]{"accessToken : " + accessToken, "refreshToken : " + refreshToken};
    }

    /**
     * 주어진 JWT 토큰에서 사용자 식별자를 추출합니다.
     *
     * @param token JWT 토큰
     * @return 사용자 식별자
     */
    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }

    /**
     * 주어진 JWT 토큰의 유효성을 검사합니다.
     *
     * @param token JWT 토큰
     * @return 토큰의 유효성 여부
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            System.out.println("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            System.out.println("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            System.out.println("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            System.out.println("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty");
        }
        return false;
    }

//    public static class JwtAuthenticationResponse {
//        private String accessToken;
//
//        public JwtAuthenticationResponse(String accessToken) {
//            this.accessToken = accessToken;
//        }
//
//        public String getAccessToken() {
//            return accessToken;
//        }
//
//        public void setAccessToken(String accessToken) {
//            this.accessToken = accessToken;
//        }
//    }
public static class JwtAuthenticationResponse {
    private String[] tokens;

    public JwtAuthenticationResponse(String[] tokens) {
        this.tokens = tokens;
    }

    public String[] getTokens() {
        return tokens;
    }

    public void setTokens(String[] tokens) {
        this.tokens = tokens;
    }
}

    public static class Tokens {
        private String accessToken;
        private String refreshToken;

        public Tokens(String accessToken, String refreshToken) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
        }

        public String getAccessToken() {
            return accessToken;
        }

        public String getRefreshToken() {
            return refreshToken;
        }
    }
}


