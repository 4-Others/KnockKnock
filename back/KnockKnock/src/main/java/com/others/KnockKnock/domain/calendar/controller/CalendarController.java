package com.others.KnockKnock.domain.calendar.controller;

import com.others.KnockKnock.domain.calendar.dto.CalendarDto;
import com.others.KnockKnock.domain.calendar.service.CalendarService;
import com.others.KnockKnock.response.ApiResponse;
import com.others.KnockKnock.utils.UriUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/calendar")
@Validated
public class CalendarController {
    private final String DEFAULT_URI = "/api/v1/calendar";
    private final CalendarService calendarService;

    @PostMapping
    // @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createCalendar(
        // @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Valid @RequestBody CalendarDto.Post requestBody
    ) {
        Long userId = 1L;

        CalendarDto.Response response = calendarService.createCalendar(userId, requestBody);

        URI uri = UriUtil.createUri(DEFAULT_URI, response.getCalendarId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", response));
    }

    @GetMapping
    // @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findBy(
        // @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Pattern(
            regexp = "\\d{4}-\\d{2}",
            message = "검색기간은 '필수' 입력값입니다. : 기대값 'yyyy-MM'"
        )
        @RequestParam String startAt
    ) {
        Long userId = 1L;

        List<CalendarDto.Response> responses = calendarService.findByUserIdAndStartAtLike(userId, startAt);

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @PatchMapping("/{calendarId}")
    // @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateCalendar(
        // @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Positive @PathVariable("calendarId") Long calendarId,
        @Valid @RequestBody CalendarDto.Patch requestBody
    ) {
        Long userId = 1L;

        CalendarDto.Response response = calendarService.updateCalendar(userId, calendarId, requestBody);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("{calendar-id}")
    public ResponseEntity<?> deleteCalendar(
        // @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Positive @PathVariable("calendar-id") Long calendarId
    ) {
        Long userId = 1L;

        calendarService.deleteCalendar(userId, calendarId);

        return ResponseEntity.noContent().build();
    }
}
