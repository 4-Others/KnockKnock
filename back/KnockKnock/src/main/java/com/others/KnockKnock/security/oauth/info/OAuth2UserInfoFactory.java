package com.others.KnockKnock.security.oauth.info;

import com.others.KnockKnock.security.oauth.entity.ProviderType;
import com.others.KnockKnock.security.oauth.info.impl.AppleOauth2UserInfo;
import com.others.KnockKnock.security.oauth.info.impl.GoogleOAuth2UserInfo;
import com.others.KnockKnock.security.oauth.info.impl.KakaoOAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
//            case FACEBOOK: return new FacebookOAuth2UserInfo(attributes);
//            case NAVER: return new NaverOAuth2UserInfo(attributes);
            case APPLE: return new AppleOauth2UserInfo(attributes);
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}

