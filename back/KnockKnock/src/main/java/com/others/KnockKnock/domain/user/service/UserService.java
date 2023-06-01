package com.others.KnockKnock.domain.user.service;

import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.mapper.UserMapper;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtUtils jwtUtils;

    public void signup(UserDto.Signup signupDto){
        User user = User.builder()
                .email(signupDto.getEmail())
                .password(signupDto.getPassword())
                .build();

        userRepository.save(user);
    }
    public String login(UserDto.Login loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();

        // 이메일을 기준으로 사용자 찾기
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return null; // 사용자 없음
        }

        User user = optionalUser.get();

        // 비밀번호 검증
        if (!password.equals(user.getPassword())) {
            return null; // 비밀번호 일치하지 않음
        }

        // JWT 토큰 생성
        String token = jwtUtils.generateToken(user.getUserId());

        return token;
    }


}
