package com.others.KnockKnock.security.oauth.info.impl;

import com.others.KnockKnock.security.oauth.info.OAuth2UserInfo;

import java.time.LocalDate;
import java.util.Map;

public class AppleOauth2UserInfo extends OAuth2UserInfo {

    public AppleOauth2UserInfo(Map<String, Object> attributes) {super(attributes);}

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public LocalDate getBirth() {
        return null;
    }

    @Override
    public Boolean getPushAgree() {
        return null;
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }
}
