package com.others.KnockKnock.domain.notification.dto;


import lombok.*;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

public class NotificationDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @Builder
    public static class Patch implements Serializable {
        @NotNull
        @NotEmpty
        private List<Long> notificationIds;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @Builder
    public static class Delete implements Serializable {
        @NotNull
        @NotEmpty
        private List<Long> notificationIds;
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    @NoArgsConstructor
    @Builder
    public static class Response implements Serializable {
        private Long notificationId;
        private String title;
        private String notifyAt;
        private Boolean delivered;
        private Boolean read;
        private String createdAt;
        private String modifiedAt;
    }
}
