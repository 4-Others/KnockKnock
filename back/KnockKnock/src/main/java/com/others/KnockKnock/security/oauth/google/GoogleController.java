package com.others.KnockKnock.security.oauth.google;

import com.others.KnockKnock.domain.user.dto.GoogleUserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.status.Status;
import com.others.KnockKnock.security.oauth.SocialLoginType;
import com.others.KnockKnock.security.oauth.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/auth")
@Slf4j
public class GoogleController {
    private final OAuthService oauthService;
    private final GoogleOauth googleOauth;

    /**
     * 사용자로부터 SNS 로그인 요청을 Social Login Type 을 받아 처리
     * @param socialLoginType (GOOGLE, FACEBOOK, NAVER, KAKAO)
     */
    @GetMapping(value = "/{socialLoginType}")
    public void socialLoginType(
            @PathVariable(name = "socialLoginType") SocialLoginType socialLoginType) {
        log.info(">> 사용자로부터 SNS 로그인 요청을 받음 :: {} Social Login", socialLoginType);
        oauthService.request(socialLoginType);
    }

    /**
     * Social Login API Server 요청에 의한 callback 을 처리
     * @param socialLoginType (GOOGLE, KAKAO)
     * @param code API Server 로부터 넘어오는 code
     * @return SNS Login 요청 결과로 받은 Json 형태의 String 문자열 (access_token, refresh_token 등)
     */
    @GetMapping(value = "/{socialLoginType}/callback")
    public String callback(
            @PathVariable(name = "socialLoginType") SocialLoginType socialLoginType,
            @RequestParam(name = "code") String code) {
        log.info(">> 소셜 로그인 API 서버로부터 받은 code :: {}", code);
        String accessToken = oauthService.requestAccessToken(socialLoginType,code);
        GoogleUserDto googleUserDto = googleOauth.getUserInfo(accessToken);
        User newUser = User.builder()
                .email(googleUserDto.getEmail())
                .status(Status.ACTIVE)
                .emailVerified(true)
                .build();
        return oauthService.requestAccessToken(socialLoginType, code);
    }
}
