package com.others.KnockKnock.domain.user.service;

import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.security.JwtTokenProvider;
import com.others.KnockKnock.security.TokenInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

//    @Autowired
//    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
//        this.userRepository = userRepository;
//        this.passwordEncoder = passwordEncoder;
//    }

    public void signup(UserDto.Signup signupDto) {
        // 회원 가입 로직 구현
        // 예: 아이디, 비밀번호, 이메일을 사용하여 새로운 회원 생성 및 저장
        String encodedPassword = passwordEncoder.encode(signupDto.getPassword());
        User newUser = new User(signupDto.getId(), encodedPassword, signupDto.getEmail());
        userRepository.save(newUser);
    }

//    public boolean login(UserDto.Login loginDto) {
//        // 로그인 로직 구현
//        User user = userRepository.findById(loginDto.getId());
//        if (user != null && passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
//            // 인증 성공
//            return true;
//        }
//        // 인증 실패
//        return false;
//    }
@Transactional
public TokenInfo login(String memberId, String password) {
    // 1. Login ID/PW 를 기반으로 Authentication 객체 생성
    // 이때 authentication 는 인증 여부를 확인하는 authenticated 값이 false
    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(memberId, password);

    // 2. 실제 검증 (사용자 비밀번호 체크)이 이루어지는 부분
    // authenticate 매서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드가 실행
    Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

    // 3. 인증 정보를 기반으로 JWT 토큰 생성
    TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

    return tokenInfo;
}
    public UserDto.Response getUserInfo(Long userId) {
        // 회원 정보 조회 로직 구현
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            // 회원 정보를 UserDto.Response 로 변환하여 반환
            return UserDto.Response.builder()
                    .userId(user.getUserId())
                    .id(user.getLoginId())
                    .password(user.getPassword())
                    .email(user.getEmail())
                    .build();
        }
        return null;
    }

    public void changePassword(Long userId, String newPassword) {
        // 비밀번호 변경 로직 구현
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            String encodedPassword = passwordEncoder.encode(newPassword);

            user = User.builder()
                    .loginId(user.getLoginId())
                    .password(encodedPassword)
                    .email(user.getEmail())
                    .build();

            userRepository.save(user);
        }
    }
}
