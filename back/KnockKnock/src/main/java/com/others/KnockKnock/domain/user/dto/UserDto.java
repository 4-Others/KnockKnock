package com.others.KnockKnock.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.others.KnockKnock.security.oauth.entity.ProviderType;
import com.others.KnockKnock.security.oauth.entity.RoleType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.LocalDateTime;


public class UserDto {
    @Getter
    @Builder
    @AllArgsConstructor
    public static class Signup{
        @NotNull
        private String id;

        @NotBlank
        @NotNull
        @Email
        private String email;

        @NotNull
        @NotBlank
        @Pattern(regexp = "^(?=.*[!@#$%^&*]).{8,}$",
                message = "패스워드는 8자 이상이어야 하며, 특수문자를 최소 1개 포함해야 합니다.")
        private String password;

        private String username;

        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;

        private boolean pushAgree;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class Login{
        @NotBlank
        @NotNull
        private String id;

        @NotNull
        @NotBlank
        private String password;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response{
        private Long userId;
        private String id;
        private String email;
        private String username;
        private LocalDate birth;
        private Boolean pushAgree;
        private String emailVerifiedYn;
        private ProviderType providerType;
        private RoleType roleType;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class PasswordUpdate {
        @NotNull
        @NotBlank
        @Pattern(regexp = "^(?=.*[!@#$%^&*]).{8,}$",
                message = "패스워드는 8자 이상이어야 하며, 특수문자를 최소 1개 포함해야 합니다.")
        private String newPassword;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UpdateProfile {
        private String username;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate birth;
        private Boolean pushAgree;
    }
}
