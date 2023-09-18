package com.others.KnockKnock.domain.tag.controller;

import com.others.KnockKnock.domain.tag.dto.TagDto;
import com.others.KnockKnock.domain.tag.service.TagService;
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
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tags")
@Validated
public class TagController {
    private final String DEFAULT_URI = "/api/v1/tags";
    private final TagService tagService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> createTag(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Valid @RequestBody TagDto.Post requestBody
    ) {
        TagDto.ResponseWithScheduleCount response = tagService.createTag(userPrincipal.getUserId(), requestBody);

        URI uri = UriUtil.createUri(DEFAULT_URI, response.getTagId());

        return ResponseEntity.created(uri).body(ApiResponse.created("data", response));
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findAllTag(
        @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        List<TagDto.ResponseWithScheduleCount> responses = tagService.findAllTag(userPrincipal.getUserId());

        return ResponseEntity.ok().body(ApiResponse.ok("data", responses));
    }

    @GetMapping("/{tag-id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> findTag(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Positive @PathVariable("tag-id") Long tagId
    ) {
        TagDto.ResponseWithSchedules response = tagService.findTag(userPrincipal.getUserId(), tagId);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @PatchMapping("/{tag-id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateTag(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Positive @PathVariable("tag-id") Long tagId,
        @Valid @RequestBody TagDto.Patch requestBody
    ) {
        TagDto.ResponseWithScheduleCount response = tagService.updateTag(userPrincipal.getUserId(), tagId, requestBody);

        return ResponseEntity.ok().body(ApiResponse.ok("data", response));
    }

    @DeleteMapping("/{tag-id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> deleteTag(
        @AuthenticationPrincipal UserPrincipal userPrincipal,
        @Positive @PathVariable("tag-id") Long tagId
    ) {
        tagService.deleteTag(userPrincipal.getUserId(), tagId);

        return ResponseEntity.noContent().build();
    }
}
