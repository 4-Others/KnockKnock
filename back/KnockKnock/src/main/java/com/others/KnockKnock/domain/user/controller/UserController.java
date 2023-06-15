package com.others.KnockKnock.domain.user.controller;


import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.service.UserService;
import com.others.KnockKnock.security.jwt.JwtTokenProvider;
import com.others.KnockKnock.security.jwt.RefreshTokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Validated @RequestBody UserDto.Signup signupDto) {
    userService.signup(signupDto);
    return ResponseEntity.status(HttpStatus.CREATED).body("회원가입이 완료되었습니다.");
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String[]>> login(@RequestBody @Valid UserDto.Login loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        String accessToken = jwtTokenProvider.generateAccessToken(email);
        String refreshToken = jwtTokenProvider.generateRefreshToken(email);

        if (accessToken == null || refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("tokens", new String[0]));
        }

        String[] tokens = { "accessToken: " + accessToken, "refreshToken: " + refreshToken };

        Map<String, String[]> response = Collections.singletonMap("tokens", tokens);

        return ResponseEntity.ok(response);
    }
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        JwtTokenProvider.JwtAuthenticationResponse response = jwtTokenProvider.refreshTokens(refreshToken);

        if (response != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("Invalid refresh token");
        }
    }
    @PatchMapping("/{email}/password")
    public ResponseEntity<String> updatePassword(@PathVariable("email") String email,
                                                 @RequestBody UserDto.PasswordUpdate passwordUpdateDto) {
        UserDto.PasswordUpdate updatedDto = UserDto.PasswordUpdate.builder()
                .email(email)
                .currentPassword(passwordUpdateDto.getCurrentPassword())
                .newPassword(passwordUpdateDto.getNewPassword())
                .build();

        userService.updatePassword(updatedDto);

        return ResponseEntity.ok("비밀번호가 성공적으로 업데이트되었습니다.");
    }
}