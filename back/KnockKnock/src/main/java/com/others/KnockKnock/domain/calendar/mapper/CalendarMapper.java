package com.others.KnockKnock.domain.calendar.mapper;

import com.others.KnockKnock.domain.calendar.dto.CalendarDto;
import com.others.KnockKnock.domain.calendar.entity.Calendar;
import com.others.KnockKnock.domain.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CalendarMapper {
    CalendarMapper INSTANCE = Mappers.getMapper(CalendarMapper.class);

    @Mapping(source = "tag", target = "tag")
    CalendarDto.Response calendarToCalendarDtoResponse(Calendar calendar);

    default Map<String, String> toMap(List<Tag> tag) {
        Map<String, String> tagMap = new HashMap<>();

        for (Tag t : tag) {
            tagMap.put("name", t.getName());
            tagMap.put("color", t.getColor());
        }

        return tagMap;
    };

    List<CalendarDto.Response> calendarListToCalendarDtoResponseList(List<Calendar> calendarList);
}
