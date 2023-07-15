package com.others.KnockKnock.security.oauth.kakao;

import com.others.KnockKnock.security.oauth.SocialOauth;
import org.springframework.stereotype.Component;

@Component
public class KakaoOauth implements SocialOauth {
    @Override
    public String getOauthRedirectURL() {
        return "http://localhost:8080/login/oauth2/code/kakao";
    }

    @Override
    public String requestAccessToken(String code) {
        return null;
    }
}
