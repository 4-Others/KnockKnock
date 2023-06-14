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
    public ResponseEntity<JwtTokenProvider.JwtAuthenticationResponse> login(@RequestBody @Valid UserDto.Login loginDto) {
        // 로그인 로직 구현
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        // 로그인 성공 시 토큰 발급
        String[] tokens = jwtTokenProvider.generateToken(email);
        JwtTokenProvider.JwtAuthenticationResponse response = new JwtTokenProvider.JwtAuthenticationResponse(tokens);
        return ResponseEntity.ok().body(response);
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

}