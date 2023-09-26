package com.others.KnockKnock.domain.tag.dto;


import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

public class TagDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Post {
        @NotNull
        @Pattern(regexp = "^(?!전체$).*", message = "이름은 '전체' 값을 사용할 수 없습니다.")
        private String name;
        private String color;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Patch {
        @Pattern(regexp = "^(?!전체$).*", message = "이름은 '전체' 값을 사용할 수 없습니다.")
        private String name;
        private String color;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Response {
        private Long tagId;
        private String name;
        private String color;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class ResponseWithScheduleCount {
        private Long tagId;
        private String name;
        private String color;
        private Integer scheduleCount;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class ResponseWithSchedules {
        private Long tagId;
        private String name;
        private String color;
        private List<ScheduleDto.Response> schedules;
    }
}
