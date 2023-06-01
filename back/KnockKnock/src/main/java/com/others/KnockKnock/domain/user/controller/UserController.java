package com.others.KnockKnock.domain.user.controller;


import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.mapper.UserMapper;
import com.others.KnockKnock.domain.user.passwordEncoder.MyPasswordEncoder;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.domain.user.service.UserService;
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
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final MyPasswordEncoder passwordEncoder;
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Validated @RequestBody UserDto.Signup signupDto) {
        userService.signup(signupDto);
        // 비밀번호 암호화
        String encryptedPassword = passwordEncoder.encode(signupDto.getPassword());

        // User 엔티티 생성
        User user = User.builder()
                .email(signupDto.getEmail())
                .password(encryptedPassword)
                .build();

        // UserRepository를 통해 User 저장
        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("회원 가입이 완료되었습니다.");
    }
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody @Valid UserDto.Login loginDto) {
        // 로그인 로직 구현
        String token = userService.login(loginDto);

        if (token == null) {
            return ResponseEntity.badRequest().body("로그인 실패");
        }

        return ResponseEntity.ok(token);
    }
}