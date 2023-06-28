package com.others.KnockKnock.domain.tag.dto;


import lombok.*;

import java.util.HashMap;
import java.util.Map;

public class TagDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Response {
        private String name;
        private String color;
    }
}
