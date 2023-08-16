package com.others.KnockKnock.security.jwt;

import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtTokenProvider {

    private final TokenConfig tokenConfig;
    private final UserRepository userRepository;
    public JwtTokenProvider(TokenConfig tokenConfig, UserRepository userRepository) {
        this.tokenConfig = tokenConfig;
        this.userRepository = userRepository;
    }

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
    public String generateAccessToken(String email) {
        Date now = new Date();
        TokenConfig tokenConfig = new TokenConfig();
        long accessTokenExpirationMs = tokenConfig.getAccessTokenExpirationMs();
        Date accessTokenExpiration = new Date(now.getTime() + accessTokenExpirationMs);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(accessTokenExpiration)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }
    public String generateRefreshToken(String email) {
        Date now = new Date();
        TokenConfig tokenConfig = new TokenConfig();
        long refreshTokenExpirationMs = tokenConfig.getRefreshTokenExpirationMs();
        Date refreshTokenExpiration = new Date(now.getTime() + refreshTokenExpirationMs);

        return Jwts.builder()
                .setSubject(email + "-refresh")
                .setIssuedAt(now)
                .setExpiration(refreshTokenExpiration)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
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
    public String getEmailFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
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

    /**
     * Refresh Token을 재발급합니다.
     *
     * @param refreshToken 이전 Refresh Token
     * @return 새로운 Access Token과 Refresh Token을 포함한 JwtAuthenticationResponse
     */
    public JwtAuthenticationResponse refreshTokens(String refreshToken) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(refreshToken)
                    .getBody();

            String subject = claims.getSubject();
            if (subject.endsWith("-refresh")) {
                String email = subject.substring(0, subject.length() - "-refresh".length());
//                // Token 재발급
//                String[] tokens = generateToken(email);
                // Access Token 재발급
                String newAccessToken = generateAccessToken(email);
                // Refresh Token 재발급
                String newRefreshToken = generateRefreshToken(email);
                // 새로운 토큰들을 포함한 응답 객체 생성
                //String[] tokens = { "accessToken: " + newAccessToken, "refreshToken: " + newRefreshToken };
                // 새로운 토큰들,유저아이디를 포함한 응답 객체 생성
                JwtAuthenticationResponse response = new JwtAuthenticationResponse(newAccessToken,newRefreshToken,userRepository.findByEmail(email).get().getUserId());
                return response;
            }
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

        // 재발급 실패 시 null 반환
        return null;
    }


    public static class JwtAuthenticationResponse {
        private String accessToken;
        private String refreshToken;

        private Long userId;

        public JwtAuthenticationResponse(String accessToken, String refreshToken, Long userId) {
            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.userId = userId;
        }
        public String getAccessToken() {
            return accessToken;
        }
        public String getRefreshToken(){
            return refreshToken;
        }
        public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }
        public void setRefreshToken(String refreshToken) {
            this.refreshToken = refreshToken;
        }
        public Long getUserId() {
            return userId;
        }
        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }

//    public static class Tokens {
//        private String accessToken;
//        private String refreshToken;
//
//        public Tokens(String accessToken, String refreshToken) {
//            this.accessToken = accessToken;
//            this.refreshToken = refreshToken;
//        }
//
//        public String getAccessToken() {
//            return accessToken;
//        }
//
//        public String getRefreshToken() {
//            return refreshToken;
//        }
//    }
}


