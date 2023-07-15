package com.others.KnockKnock.domain.tag.dto;


import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import lombok.*;

import java.util.List;

public class TagDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Response {
        private String name;
        private String color;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PROTECTED)
    @NoArgsConstructor
    @Builder
    public static class Get {
        private String name;
        private String color;

        private List<ScheduleDto.Response> schedules;
    }
}
