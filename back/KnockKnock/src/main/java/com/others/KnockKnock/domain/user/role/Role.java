package com.others.KnockKnock.domain.user.role;

public enum Role {
    ROLE_USER, ROLE_ADMIN;

    public String getAuthority() {
        return name();
    }
}

