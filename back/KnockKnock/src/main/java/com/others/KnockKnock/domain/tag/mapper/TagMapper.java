package com.others.KnockKnock.domain.tag.mapper;


import com.others.KnockKnock.domain.schedule.entity.Schedule;
import com.others.KnockKnock.domain.tag.dto.TagDto;
import com.others.KnockKnock.domain.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TagMapper {
    TagMapper INSTANCE = Mappers.getMapper(TagMapper.class);

    @Mapping(source = "schedule", target = "schedules")
    TagDto.ResponseWithSchedules tagToTagDtoResponseWithSchedules(Tag tag);

    @Mapping(source = "schedule", target = "scheduleCount", qualifiedByName="mapScheduleCount")
    TagDto.ResponseWithScheduleCount tagToTagDtoResponseWithScheduleCount(Tag tag);

    @Named("mapScheduleCount")
    default Integer mapScheduleCount(List<Schedule> scheduleList) {
        return (scheduleList != null) ? scheduleList.size() : 0;
    }

    List<TagDto.ResponseWithScheduleCount> tagListToTagDtoResponseWithScheduleCountList(List<Tag> tagList);
}
