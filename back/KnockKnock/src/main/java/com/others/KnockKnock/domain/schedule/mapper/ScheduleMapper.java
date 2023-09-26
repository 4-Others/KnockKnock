package com.others.KnockKnock.domain.schedule.mapper;

import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import com.others.KnockKnock.domain.schedule.entity.Schedule;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ScheduleMapper {
    ScheduleMapper INSTANCE = Mappers.getMapper(ScheduleMapper.class);

    DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    @Mapping(source = "startAt", target = "startAt", qualifiedByName="mapToDateFormat")
    @Mapping(source = "endAt", target = "endAt", qualifiedByName="mapToDateFormat")
    ScheduleDto.Response scheduleToScheduleDtoResponse(Schedule schedule);

    @Named("mapToDateFormat")
    default String mapToDateFormat(LocalDateTime dateTime) {
        return dateTime.format(TIME_FORMATTER);
    }

    List<ScheduleDto.Response> scheduleListToScheduleDtoResponseList(List<Schedule> scheduleList);
}
