package com.others.KnockKnock.security.oauth.info;

import java.time.LocalDate;
import java.util.Map;

public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract LocalDate getBirth();

    public abstract Boolean getPushAgree();

    public abstract String getImageUrl();
}

