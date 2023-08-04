package com.others.KnockKnock.security.oauth.kakao;

import com.others.KnockKnock.security.oauth.SocialOauth;
import org.springframework.stereotype.Component;

@Component
public class KakaoOauth implements SocialOauth {
    @Override
    public String getOauthRedirectURL() {
        return "http://ec2-54-90-128-33.compute-1.amazonaws.com:8080/login/oauth2/code/kakao";
    }

    @Override
    public String requestAccessToken(String code) {
        return null;
    }
}
