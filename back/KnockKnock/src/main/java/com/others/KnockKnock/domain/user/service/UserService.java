package com.others.KnockKnock.domain.user.service;

import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.passwordEncoder.MyPasswordEncoder;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.domain.user.status.Status;
import com.others.KnockKnock.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final MyPasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public void signup(UserDto.Signup signupDto){
        //중복 이메일 체크
        Optional<User> existingUser = userRepository.findByEmail(signupDto.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }
        User user = User.builder()
                .email(signupDto.getEmail())
                .password(passwordEncoder.encode(signupDto.getPassword()))
                .status(Status.ACTIVE)
                .build();

        userRepository.save(user);
    }

    public String login(UserDto.Login loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        // 이메일을 기준으로 사용자 찾기
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("아이디나 비밀번호가 잘못되었습니다."); // 예외 메시지 추가
        }

        User user = optionalUser.get();
        if (user.getStatus() == Status.INACTIVE) {
            throw new IllegalArgumentException("이 계정은 휴면계정입니다."); // 예외 메시지 추가
        }
        if (user.getStatus() == Status.SIGNED_OUT) {
            throw new IllegalArgumentException("이 계정은 탈퇴한 계정입니다."); // 예외 메시지 추가
        }
        // 비밀번호 검증
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("아이디나 비밀번호가 잘못되었습니다."); // 예외 메시지 추가
        }
        // JWT 토큰 생성
        String token = jwtUtils.generateToken(user.getUserId());

        return token;
    }
    public void updatePassword(UserDto.PasswordUpdate passwordUpdateDto) {
        String userEmail = passwordUpdateDto.getEmail();
        String currentPassword = passwordUpdateDto.getCurrentPassword();
        String encodedCurrentPassword = passwordEncoder.encode(currentPassword);
        String newPassword = passwordUpdateDto.getNewPassword();
        String encodedNewPassword = passwordEncoder.encode(newPassword);
        // 이메일을 기준으로 사용자 찾기
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);

        if (!optionalUser.isPresent()) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }

        User user = optionalUser.get();
        if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
        }
//        if(!currentPassword.equals(user.getPassword())){
//            throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
//        }

        // 새로운 비밀번호와 현재 비밀번호가 동일한 경우 예외 처리
        if (passwordEncoder.matches(newPassword, user.getPassword())) {
            throw new IllegalArgumentException("현재 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.");
        }

        // 새로운 비밀번호로 업데이트
        User updatedUser = User.builder()
                .userId(user.getUserId())
                .email(user.getEmail())
                .status(user.getStatus())
                .password(encodedNewPassword)
                .emailVerified(user.isEmailVerified())
                .build();

        userRepository.save(updatedUser);
    }
    public void deleteUser(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new IllegalArgumentException("사용자를 찾을 수 없습니다.");
        }

        User user = optionalUser.get();
        user.setStatus(Status.SIGNED_OUT);
       // user.addStatusHistory(Status.SIGNED_OUT, LocalDateTime.now());
        userRepository.save(user);
    }

    public void updateUserLastLoggedIn(User user) {
        user.setLastLoggedIn(LocalDateTime.now());
        userRepository.save(user);
    }
}
