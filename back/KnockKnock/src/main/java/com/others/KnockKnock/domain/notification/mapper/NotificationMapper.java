package com.others.KnockKnock.domain.notification.mapper;

import com.others.KnockKnock.domain.notification.dto.NotificationDto;
import com.others.KnockKnock.domain.notification.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NotificationMapper {
    NotificationMapper INSTANCE = Mappers.getMapper(NotificationMapper.class);

    NotificationDto.Response notificationToNotificationDtoResponse(Notification notification);

    List<NotificationDto.Response> notificationListToNotificationDtoResponseList(List<Notification> notificationList);
}
