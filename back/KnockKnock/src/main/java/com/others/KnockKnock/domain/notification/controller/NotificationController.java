package com.others.KnockKnock.domain.notification.controller;

import com.others.KnockKnock.domain.notification.dto.NotificationDto;
import com.others.KnockKnock.domain.notification.mapper.NotificationMapper;
import com.others.KnockKnock.domain.notification.service.NotificationService;
import com.others.KnockKnock.response.ApiResponse;
import com.others.KnockKnock.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
@Validated
public class NotificationController {
    private final String DEFAULT_URI = "/api/v1/notification";
    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;

    @PostMapping
    public ResponseEntity<?> createNotification(@Valid @RequestBody NotificationDto.Post requestBody) {
        NotificationDto.Response notification = notificationService.createNotification(notificationMapper.notificationDtoPostToNotification(requestBody), 1L);

        URI uri = UriUtil.createUri(DEFAULT_URI, notification.getNotificationId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", notification));
    }

    @GetMapping
    public Flux<ServerSentEvent<List<NotificationDto.Response>>> getNotification(@Positive @RequestParam("user-id") Long userId) {
        return notificationService.getNotification(userId);
    }
}
