package com.others.KnockKnock.domain.schedule.controller;

import com.others.KnockKnock.domain.schedule.dto.ScheduleDto;
import com.others.KnockKnock.domain.schedule.service.ScheduleService;
import com.others.KnockKnock.response.ApiResponse;
import com.others.KnockKnock.security.oauth.entity.UserPrincipal;
import com.others.KnockKnock.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/schedule")
@Validated
public class ScheduleController {
    private final String DEFAULT_URI = "/api/v1/schedule";
    private final ScheduleService scheduleService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createSchedule(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Valid @RequestBody ScheduleDto.Post requestBody
    ) {
        ScheduleDto.Response response = scheduleService.createSchedule(userPrincipal.getUserId(), requestBody);

        URI uri = UriUtil.createUri(DEFAULT_URI, response.getScheduleId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", response));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findAllSchedule(
        @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        List<ScheduleDto.Response> responses = scheduleService.findAllSchedule(userPrincipal.getUserId());

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @GetMapping("/calendar")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findCalendar(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Pattern(
            regexp = "\\d{4}-\\d{2}",
            message = "검색기간은 '필수' 입력값입니다. : 기대값 'yyyy-MM'"
        ) @RequestParam String startAt)
     {
        List<ScheduleDto.Response> responses = scheduleService.findScheduleForCalendar(userPrincipal.getUserId(), startAt);

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @PatchMapping("/{schedule-id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateCalendar(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Positive @PathVariable("schedule-id") Long scheduleId,
        @Valid @RequestBody ScheduleDto.Patch requestBody
    ) {
        ScheduleDto.Response response = scheduleService.updateSchedule(userPrincipal.getUserId(), scheduleId, requestBody);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("{schedule-id}")
    public ResponseEntity<?> deleteCalendar(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Positive @PathVariable("schedule-id") Long scheduleId
    ) {
        scheduleService.deleteSchedule(userPrincipal.getUserId(), scheduleId);

        return ResponseEntity.noContent().build();
    }
}
