package com.others.KnockKnock.domain.user.controller;


import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Validated @RequestBody UserDto.Signup signupDto) {
        userService.signup(signupDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원 가입이 완료되었습니다.");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@Validated @RequestBody UserDto.Login loginDto) {
        if (userService.login(loginDto)) {
            return ResponseEntity.ok("로그인 성공");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto.Response> getUserInfo(@PathVariable Long userId) {
        UserDto.Response userInfo = userService.getUserInfo(userId);
        return ResponseEntity.ok(userInfo);
    }

    @PostMapping("/password/{userId}")
    public ResponseEntity<String> changePassword(@PathVariable Long userId, @RequestBody String newPassword) {
        userService.changePassword(userId, newPassword);
        return ResponseEntity.ok("비밀번호 변경이 완료되었습니다.");
    }
}