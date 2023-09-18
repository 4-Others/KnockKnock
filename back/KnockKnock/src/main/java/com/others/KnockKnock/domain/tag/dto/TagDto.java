package com.others.KnockKnock.domain.tag.dto;


import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import lombok.*;

import javax.validation.constraints.NotNull;
import java.util.List;

public class TagDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Post {
        @NotNull
        private String name;
        private String color;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Patch {
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
