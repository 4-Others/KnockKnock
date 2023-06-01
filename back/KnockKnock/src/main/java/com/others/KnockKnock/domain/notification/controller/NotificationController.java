package com.others.KnockKnock.domain.notification.controller;

import com.others.KnockKnock.domain.notification.dto.NotificationDto;
import com.others.KnockKnock.domain.notification.repository.NotificationRepository;
import com.others.KnockKnock.domain.notification.service.NotificationService;
import com.others.KnockKnock.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notification")
@Validated
public class NotificationController {
    private final NotificationRepository notificationRepository;
    private final NotificationService notificationService;

    @GetMapping("/stream")
    // @PreAuthorize("isAuthenticated()")
    public Flux<ServerSentEvent<List<NotificationDto.Response>>> streamEvent(
        // @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        Long userId = 1L;

        return notificationService.genStreamEvent(userId);
    }

    @PatchMapping("/read")
    // @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateReadStatus(
        // @AuthenticationPrincipal UserPrincipal userPrincipal
        @Valid @RequestBody NotificationDto.Patch requestBody
    ) {
        Long userId = 1L;

        List<NotificationDto.Response> responses = notificationService.updateReadStatus(userId, requestBody.getNotificationIds());

        return ResponseEntity.ok()
                   .body(ApiResponse.ok("data", responses));
    }

    @DeleteMapping("/{notification-id}")
    public ResponseEntity<?> deleteNotification(@Positive @PathVariable("notification-id") Long notificationId) {

        notificationRepository.delete(notificationRepository.findById(notificationId).get());

        return ResponseEntity.noContent().build();
    }
}
