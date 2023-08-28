package com.others.KnockKnock.domain.user.controller;

import com.others.KnockKnock.common.ApiResponse;
import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.mapper.UserMapper;
import com.others.KnockKnock.domain.user.service.UserService;
import com.others.KnockKnock.security.oauth.entity.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;


    /*
    유저 정보 불러오기 api
     */
    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Optional<User> user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }
    /*
    회원 가입 api : Local
     */
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@Validated @RequestBody UserDto.Signup requestBody) {
        User user = userService.signup(userMapper.userDtoSignupToUser(requestBody));

        return ResponseEntity.ok("이메일 인증을 해주세요.");
    }
    /*
    현재 패스워드 업데이트 api
     */
    @PatchMapping("/password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateUserPassword(
            @Valid @RequestBody UserDto.PasswordUpdate requestBody,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        userService.updateUserPassword(
                userPrincipal.getUserId(),
                userMapper.userDtoPasswordToUser(requestBody)
        );

        return ResponseEntity.ok().body(ApiResponse.success("업데이트 완료", requestBody));
    }
    /*
    회원 탈퇴 api
     */
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        userService.deleteUser(userPrincipal.getId());
        return ResponseEntity.ok("회원 탈퇴가 성공적으로 이루어졌습니다.");
    }
}
    /*
    예전 회원가입 api
     */
//    @PostMapping("/signup")
//    public ResponseEntity<String> signup(@Validated @RequestBody UserDto.Signup signupDto) {
//        String email = signupDto.getEmail();
//        String password = signupDto.getPassword();
//        LocalDate birth = signupDto.getBirth();
//        boolean pushAgree = signupDto.isPushAgree();
//
//        String encryptedPassword = passwordEncoder.encode(password);
//
//        // 사용자 정보 저장
//        User user = User.builder()
//                .email(email)
//                .password(encryptedPassword)
//                .emailVerifiedYn("Y")
//                .birth(birth)
//                .pushAgree(pushAgree)
//                .build();
//        userRepository.save(user);
//
//        return ResponseEntity.ok("이메일 인증을 해주세요.");
//    }

    /*
    예전 refreshToken 재발급 api
    AuthController 에 있어서 주석처리했음
     */
//    @PreAuthorize("isAuthenticated()")
//    @PostMapping("/refreshToken")
//    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
//        String refreshToken = request.getRefreshToken();
//
//        JwtTokenProvider.JwtAuthenticationResponse response = jwtTokenProvider.refreshTokens(refreshToken);
//
//
//        if (response != null) {
//            Map<String, Object> responseBody = new HashMap<>();
//            responseBody.put("accessToken", response.getAccessToken());
//            responseBody.put("refreshToken", response.getRefreshToken());
//            responseBody.put("userId", response.getUserId());
//
//            return ResponseEntity.ok(responseBody);
//        } else {
//            return ResponseEntity.badRequest().body("Invalid refresh token");
//        }
//    }

    /*
     * 옛날 로그인 방식 현재는 AuthController에 있음
    */
//    @PostMapping("/login")
//    public ResponseEntity<Map<String, Object>> login(@RequestBody @Valid UserDto.Login loginDto) {
//        String email = loginDto.getEmail();
//        String password = loginDto.getPassword();
//        Optional<User> userOptional = userRepository.findByEmail(email);
//        //String encodedPassword = mypasswordEncoder.encode(password);
//        User user = userOptional.get();
//        // 패스워드 일치 여부 확인
//        if (!mypasswordEncoder.matches(password,user.getPassword())) {
//            //throw new IllegalArgumentException("아이디나 비밀번호가 잘못되었습니다.");
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("error", new String[]{"패스워드가 틀렸어요!"}));
//        }
//        //userService.updateUserLastLoggedIn(user);
//        String accessToken = jwtTokenProvider.generateAccessToken(email);
//        String refreshToken = jwtTokenProvider.generateRefreshToken(email);
//        if (accessToken == null || refreshToken == null) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Collections.singletonMap("tokens", new String[0]));
//        }
//
//        Map<String, Object> response = new HashMap<>();
//        response.put("userId", user.getUserId());
//        response.put("accessToken", accessToken);
//        response.put("refreshToken", refreshToken);
//
//        return ResponseEntity.ok(response);
//    }
    /*
    이전 패스워드 업데이트 api
     */
//    @PreAuthorize("isAuthenticated()")
//    @PatchMapping("/{email}/password")
//    public ResponseEntity<String> updatePassword(@PathVariable("email") String email,
//                                                 @RequestBody UserDto.PasswordUpdate passwordUpdateDto) {
//        UserDto.PasswordUpdate updatedDto = UserDto.PasswordUpdate.builder()
//                .email(email)
//                .currentPassword(passwordUpdateDto.getCurrentPassword())
//                .newPassword(passwordUpdateDto.getNewPassword())
//                .build();
//
//        userService.updatePassword(updatedDto);
//
//        return ResponseEntity.ok("비밀번호가 성공적으로 업데이트되었습니다.");
//    }