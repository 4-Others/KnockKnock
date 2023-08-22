package com.others.KnockKnock.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.others.KnockKnock.custom.Password;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Generated;
import lombok.Getter;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
        @NotBlank
        @NotNull
        @Email
        private String email;

        @NotNull
        @NotBlank
        @Pattern(regexp = "^(?=.*[!@#$%^&*]).{8,}$",
                message = "패스워드는 8자 이상이어야 하며, 특수문자를 최소 1개 포함해야 합니다.")
        private String password;

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
        private String email;

        @NotNull
        @NotBlank
        private String password;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class Response{
        private Long userId;
        private String email;
        private String password;
    }
    @Getter
    @Builder
    @AllArgsConstructor
    public static class PasswordUpdate {
        @NotBlank
        @NotNull
        private String email;

        @NotNull
        @NotBlank
        @Pattern(regexp = "^(?=.*[!@#$%^&*]).{8,}$",
                message = "패스워드는 8자 이상이어야 하며, 특수문자를 최소 1개 포함해야 합니다.")
        private String currentPassword;

        @NotNull
        @NotBlank
        @Pattern(regexp = "^(?=.*[!@#$%^&*]).{8,}$",
                message = "패스워드는 8자 이상이어야 하며, 특수문자를 최소 1개 포함해야 합니다.")
        private String newPassword;
    }
}
