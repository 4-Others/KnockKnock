package com.others.KnockKnock.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GoogleUserDto {
    private String email;
    private String name;
    private String given_name;
    private String family_name;
    private String picture;
    private String locale;
}
