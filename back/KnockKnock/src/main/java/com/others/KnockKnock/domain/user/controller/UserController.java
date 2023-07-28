package com.others.KnockKnock.domain.user.controller;

import com.others.KnockKnock.domain.user.dto.BaseResponse;
import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.passwordEncoder.MyPasswordEncoder;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.domain.user.service.UserService;
import com.others.KnockKnock.domain.user.status.Status;
import com.others.KnockKnock.security.jwt.JwtTokenProvider;
import com.others.KnockKnock.security.jwt.RefreshTokenRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Collections;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MyPasswordEncoder mypasswordEncoder;


    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Validated @RequestBody UserDto.Signup signupDto) {
        String email = signupDto.getEmail();
        String password = signupDto.getPassword();

        String encryptedPassword = mypasswordEncoder.encode(password);

        // 사용자 정보 저장
        User user = User.builder()
                .email(email)
                .password(encryptedPassword)
                .emailVerified(false)
                .status(Status.INACTIVE)
                .build();
        userRepository.save(user);

        return ResponseEntity.ok("이메일 인증을 해주세요.");
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, String[]>> login(@RequestBody @Valid UserDto.Login loginDto) {
        String email = loginDto.getEmail();
        String password = loginDto.getPassword();
        Optional<User> userOptional = userRepository.findByEmail(email);
        //String encodedPassword = mypasswordEncoder.encode(password);
        User user = userOptional.get();
        if (!user.isEmailVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", new String[]{"Email not verified"}));
        }
        if (user.getStatus() != Status.ACTIVE) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", new String[]{"Cannot login. User is not active."}));
        }
        // 패스워드 일치 여부 확인
        if (!mypasswordEncoder.matches(password,user.getPassword())) {
            //throw new IllegalArgumentException("아이디나 비밀번호가 잘못되었습니다.");
             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", new String[]{"패스워드가 틀렸어요!"}));
        }
        userService.updateUserLastLoggedIn(user);
        String accessToken = jwtTokenProvider.generateAccessToken(email);
        String refreshToken = jwtTokenProvider.generateRefreshToken(email);
        if (accessToken == null || refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("tokens", new String[0]));
        }

        String[] tokens = { "accessToken: " + accessToken, "refreshToken: " + refreshToken };

        Map<String, String[]> response = Collections.singletonMap("tokens", tokens);

        return ResponseEntity.ok(response);
    }
    @PreAuthorize("isAuthenticated()")
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
    @PreAuthorize("isAuthenticated()")
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
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable("email") String email) {
        userService.deleteUser(email);
        return ResponseEntity.ok("회원 탈퇴가 성공적으로 이루어졌습니다.");
    }
    @ResponseBody
    @GetMapping("/kakao")
    public BaseResponse<String> kakaoCallback(@RequestParam String code){
        String response = "성공적으로 카카오 로그인 API 코드를 불러왔습니다.";
        System.out.println(code);
        return  new BaseResponse<String>(response);
    }
    //배포자동화 테스트입니다.
}