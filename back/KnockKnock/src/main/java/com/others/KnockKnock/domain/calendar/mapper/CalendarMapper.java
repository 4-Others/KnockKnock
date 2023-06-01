package com.others.KnockKnock.domain.calendar.mapper;

import com.others.KnockKnock.domain.calendar.dto.CalendarDto;
import com.others.KnockKnock.domain.calendar.entity.Calendar;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CalendarMapper {
    CalendarMapper INSTANCE = Mappers.getMapper(CalendarMapper.class);

    CalendarDto.Response calendarToCalendarDtoResponse(Calendar calendar);

    List<CalendarDto.Response> calendarListToCalendarDtoResponseList(List<Calendar> calendarList);
}
