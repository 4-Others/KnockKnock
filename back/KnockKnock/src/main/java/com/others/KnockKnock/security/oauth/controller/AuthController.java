package com.others.KnockKnock.security.oauth.controller;

import com.others.KnockKnock.common.ApiResponse;
import com.others.KnockKnock.security.properties.AppProperties;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.entity.UserRefreshToken;
import com.others.KnockKnock.domain.user.repository.UserRefreshTokenRepository;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.security.oauth.entity.AuthReqModel;
import com.others.KnockKnock.security.oauth.entity.RoleType;
import com.others.KnockKnock.security.oauth.entity.UserPrincipal;
import com.others.KnockKnock.security.oauth.token.AuthToken;
import com.others.KnockKnock.security.oauth.token.AuthTokenProvider;
import com.others.KnockKnock.utils.CookieUtil;
import com.others.KnockKnock.utils.HeaderUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private  final PasswordEncoder passwordEncoder;

    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

    /*
    현재 로그인 방식
    */
    @PostMapping("/login")
    public ApiResponse login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody AuthReqModel authReqModel
    ) {
        //email 인증 안된경우 api 호출 불가능
        Optional<User> userOptional = userRepository.findById(authReqModel.getId());

        if (userOptional.isEmpty() || !"Y".equals(userOptional.get().getEmailVerifiedYn())) {
            return ApiResponse.unAuthorized();
        }

        User user = userOptional.get();
        String enteredPassword = authReqModel.getPassword();
        //패스워드 일치여부 판별
        if(passwordEncoder.matches(enteredPassword, user.getPassword())) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authReqModel.getId(),
                            authReqModel.getPassword()
                    )
            );

            String userId = authReqModel.getId();
            SecurityContextHolder.getContext().setAuthentication(authentication);

            Date now = new Date();
            AuthToken accessToken = tokenProvider.createAuthToken(
                    userId,
                    ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                    new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
            );

            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
            AuthToken refreshToken = tokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // userId refresh token 으로 DB 확인
            UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userId);
            if (userRefreshToken == null) {
                // 없는 경우 새로 등록
                userRefreshToken = new UserRefreshToken(userId, refreshToken.getToken());
                userRefreshTokenRepository.saveAndFlush(userRefreshToken);
            } else {
                // DB에 refresh 토큰 업데이트
                userRefreshToken.setRefreshToken(refreshToken.getToken());
            }

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

            return ApiResponse.success("token", accessToken.getToken());
        }
        else{
            return ApiResponse.passwordWrong();
        }
    }
    /*
    사용자 액세스 토큰을 반환하는 api
     */
    @GetMapping("/refresh")
    public ApiResponse refreshToken (HttpServletRequest request, HttpServletResponse response) {
        // access token 확인
        String accessToken = HeaderUtil.getAccessToken(request);
        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            return ApiResponse.invalidAccessToken();
        }

        // expired access token 인지 확인
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            return ApiResponse.notExpiredTokenYet();
        }

        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);

        if (authRefreshToken.validate()) {
            return ApiResponse.invalidRefreshToken();
        }

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
        if (userRefreshToken == null) {
            return ApiResponse.invalidRefreshToken();
        }

        Date now = new Date();
        AuthToken newAccessToken = tokenProvider.createAuthToken(
                userId,
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();

        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh 토큰 설정
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = tokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
        }

        return ApiResponse.success("token", newAccessToken.getToken());
    }
}