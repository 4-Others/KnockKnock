package com.others.KnockKnock.domain.calendar.dto;

import com.others.KnockKnock.domain.calendar.entity.Calendar.Period;
import com.others.KnockKnock.domain.tag.dto.TagDto;
import com.others.KnockKnock.global.annotations.ValidEnum;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CalendarDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @Builder
    public static class Post implements Serializable {
        @NotBlank
        @NotNull
        private String title;

        @Nullable
        private String content;

        @NotNull
        @ValidEnum(
            enumClass = Period.class,
            message = "종일 또는 특정시간 설정은 '필수' 입력값입니다. : 기대값 = ['ALL_DAY', 'SPECIFIC_TIME']",
            ignoreCase = true
        )
        private String period;

        @NotNull
        @NotBlank
        @Pattern(
            regexp = "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}",
            message = "시작기간(시간/일)은 '필수' 입력값입니다. : 기대값 'yyyy-MM-dd HH:mm:ss'"
        )
        private String startAt;

        @NotNull
        @NotBlank
        @Pattern(
            regexp = "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}",
            message = "종료기간(시간/일)은 '필수' 입력값입니다. : 기대값 'yyyy-MM-dd HH:mm:ss'"
        )
        private String endAt;

        private List<Integer> alerts = new ArrayList<>();
        private Map<String, String> tag = new HashMap<>();
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @Builder
    public static class Patch implements Serializable {
        @Nullable
        private String title;

        @Nullable
        private String content;

        @Nullable
        @ValidEnum(
            enumClass = Period.class,
            message = "종일 또는 특정시간 설정은 '필수' 입력값입니다. : 기대값 = ['ALL_DAY', 'SPECIFIC_TIME']",
            ignoreCase = true
        )
        private String period;

        @Nullable
        @Pattern(
            regexp = "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}",
            message = "시작기간(시간/일)은 '필수' 입력값입니다. : 기대값 'yyyy-MM-dd HH:mm:ss'"
        )
        private String startAt;

        @Nullable
        @Pattern(
            regexp = "\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}",
            message = "종료기간(시간/일)은 '필수' 입력값입니다. : 기대값 'yyyy-MM-dd HH:mm:ss'"
        )
        private String endAt;

        private List<Integer> alerts = new ArrayList<>();
        private Map<String, String> tag = new HashMap<>();
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @Builder
    public static class Response implements Serializable {
        private Long calendarId;
        private String title;
        private String content;
        private Period period;
        private String startAt;
        private String endAt;
        private List<Integer> alerts;
        // MapStruct toMap(List<Tag> tag)
        private Map<String, String> tag;
        private String createdAt;
        private String modifiedAt;
    }
}
