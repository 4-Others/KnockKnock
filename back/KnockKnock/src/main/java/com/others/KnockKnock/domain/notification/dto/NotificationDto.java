package com.others.KnockKnock.domain.notification.dto;


import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

public class NotificationDto {
    @Getter
    public static class Post implements Serializable {
        private final String title;
        private final String period;

        @Builder
        public Post(String title, String period) {
            this.title = title;
            this.period = period;
        }
    }

    @Getter
    public static class Response implements Serializable {
        private final Long notificationId;
        private final String title;
        private final String period;
        private final Boolean delivered;
        private final Boolean read;
        private final String createdAt;
        private final String modifiedAt;

        @Builder
        public Response(Long notificationId, String title, String period, Boolean delivered, Boolean read, String createdAt, String modifiedAt) {
            this.notificationId = notificationId;
            this.title = title;
            this.period = period;
            this.delivered = delivered;
            this.read = read;
            this.createdAt = createdAt;
            this.modifiedAt = modifiedAt;
        }
    }
}
