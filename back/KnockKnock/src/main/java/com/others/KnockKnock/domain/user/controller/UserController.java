package com.others.KnockKnock.domain.user.controller;


import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.service.UserService;
import com.others.KnockKnock.security.jwt.JwtTokenProvider;
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
//    @PostMapping("/signup")
//    public ResponseEntity<JwtTokenProvider.JwtAuthenticationResponse> signup(@Validated @RequestBody UserDto.Signup signupDto) {
//        userService.signup(signupDto);
//
//        String[] token = jwtTokenProvider.generateToken(signupDto.getEmail());
//        JwtTokenProvider.JwtAuthenticationResponse response = new JwtTokenProvider.JwtAuthenticationResponse(token);
//        return ResponseEntity.status(HttpStatus.CREATED).body(response);
//    }
//    @PostMapping("/login")
//    public ResponseEntity<String> login(@RequestBody @Valid UserDto.Login loginDto) {
//        // 로그인 로직 구현
//        String token = userService.login(loginDto);
//
//        if (token == null) {
//            return ResponseEntity.badRequest().body("로그인 실패");
//        }
//
//        return ResponseEntity.ok().body("로그인 되었습니다.");
//    }
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

}