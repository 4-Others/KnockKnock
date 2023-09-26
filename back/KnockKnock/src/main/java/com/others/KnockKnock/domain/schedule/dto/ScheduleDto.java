package com.others.KnockKnock.domain.schedule.dto;

import com.others.KnockKnock.domain.tag.dto.TagDto;
import com.others.KnockKnock.global.annotations.ValidEnum;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import static com.others.KnockKnock.domain.schedule.entity.Schedule.*;

public class ScheduleDto {
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

        private Boolean complete;

        private Long tagId;
        private List<Integer> alerts = new ArrayList<>();
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

        private Boolean complete;

        private Long tagId;
        private List<Integer> alerts = new ArrayList<>();
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @Builder
    public static class Response implements Serializable {
        private Long scheduleId;
        private String title;
        private String content;
        private Period period;
        private String startAt;
        private String endAt;
        private Boolean complete;
        private List<Integer> alerts;
        private TagDto.Response tag;
        private String createdAt;
        private String modifiedAt;
    }
}
