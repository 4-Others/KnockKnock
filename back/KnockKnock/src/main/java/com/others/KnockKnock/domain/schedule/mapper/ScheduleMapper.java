package com.others.KnockKnock.domain.schedule.mapper;

import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import com.others.KnockKnock.domain.schedule.entity.Schedule;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ScheduleMapper {
    ScheduleMapper INSTANCE = Mappers.getMapper(ScheduleMapper.class);

    // @Mapping(source = "tag", target = "tag")
    ScheduleDto.Response scheduleToScheduleDtoResponse(Schedule schedule);
    //
    // default Map<String, String> tagToMap(List<Tag> tag) {
    //     Map<String, String> tagMap = new HashMap<>();
    //
    //     for (Tag t : tag) {
    //         tagMap.put("name", t.getName());
    //         tagMap.put("color", t.getColor());
    //     }
    //
    //     return tagMap;
    // }

    List<ScheduleDto.Response> scheduleListToScheduleDtoResponseList(List<Schedule> scheduleList);
}
