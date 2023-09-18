package com.others.KnockKnock.domain.notification.controller;

import com.others.KnockKnock.domain.notification.dto.NotificationDto;
import com.others.KnockKnock.domain.notification.repository.NotificationRepository;
import com.others.KnockKnock.domain.notification.service.NotificationService;
import com.others.KnockKnock.response.ApiResponse;
import com.others.KnockKnock.security.oauth.entity.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
@Validated
public class NotificationController {
    private final NotificationRepository notificationRepository;
    private final NotificationService notificationService;

    @GetMapping("/stream")
    @PreAuthorize("isAuthenticated()")
    public Flux<ServerSentEvent<List<NotificationDto.Response>>> streamEvent(
        @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        return notificationService.genStreamEvent(userPrincipal.getUserId());
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findDeliveredNotification(
        @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        List<NotificationDto.Response> responses = notificationService.findAllByUserIdAndDelivered(userPrincipal.getUserId());

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @PatchMapping("/read")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateReadStatus(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Valid @RequestBody NotificationDto.Patch requestBody
    ) {
        List<NotificationDto.Response> responses = notificationService.updateReadStatus(userPrincipal.getUserId(), requestBody.getNotificationIds());

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteNotification(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Valid @RequestBody NotificationDto.Delete requestBody
    ) {
        notificationService.deleteAllNotificationDelivered(userPrincipal.getUserId(), requestBody.getNotificationIds());

        return ResponseEntity.noContent().build();
    }
}
