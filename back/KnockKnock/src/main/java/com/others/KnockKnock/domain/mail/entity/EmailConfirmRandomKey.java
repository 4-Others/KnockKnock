package com.others.KnockKnock.domain.mail.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;

@RedisHash(value = "EmailConfirmRandomKey")
public class EmailConfirmRandomKey {
    @Id
    private String id;

    private String randomKey;

    @TimeToLive
    private Long expiration;

    public EmailConfirmRandomKey() {
    }

    private EmailConfirmRandomKey(String id, String randomKey, Long expiration) {
        this.id = id;
        this.randomKey = randomKey;
        this.expiration = expiration;
    }

    public String getId() {
        return id;
    }

    public String getRandomKey() {
        return randomKey;
    }

    public Long getExpiration() {
        return expiration;
    }

    public static EmailConfirmRandomKeyBuilder builder() {
        return new EmailConfirmRandomKeyBuilder();
    }

    public static class EmailConfirmRandomKeyBuilder {
        private String id;
        private String randomKey;
        private Long expiration;

        private EmailConfirmRandomKeyBuilder() {
        }

        public EmailConfirmRandomKeyBuilder id(String id) {
            this.id = id;
            return this;
        }

        public EmailConfirmRandomKeyBuilder randomKey(String randomKey) {
            this.randomKey = randomKey;
            return this;
        }

        public EmailConfirmRandomKeyBuilder expiration(Long expiration) {
            this.expiration = expiration;
            return this;
        }

        public EmailConfirmRandomKey build() {
            return new EmailConfirmRandomKey(id, randomKey, expiration);
        }
    }
}

