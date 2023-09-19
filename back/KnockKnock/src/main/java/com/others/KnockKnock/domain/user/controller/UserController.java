package com.others.KnockKnock.domain.user.controller;

import com.others.KnockKnock.common.ApiResponse;
import com.others.KnockKnock.domain.mail.dto.VerifyDto;
import com.others.KnockKnock.domain.mail.service.EmailService;
import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.mapper.UserMapper;
import com.others.KnockKnock.domain.user.service.UserService;
import com.others.KnockKnock.security.oauth.entity.UserPrincipal;
import com.others.KnockKnock.utils.HeaderUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;
    private final EmailService emailService;
    private final UserMapper userMapper;

    /*
    유저 정보 불러오기 api
     */
    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> getUser(@AuthenticationPrincipal UserPrincipal userPrincipal) {

        User user = userService.findUserByUserId(userPrincipal.getUserId());

        UserDto.Response response = userMapper.userToUserDtoResponse(user);

        return ResponseEntity.ok().body(ApiResponse.success("data", response));
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
    패스워드 제외 사용자 정보 수정 api
     */
    @PatchMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> updateUserProfile(
            @Valid @RequestBody UserDto.UpdateProfile requestBody,
            @AuthenticationPrincipal UserPrincipal userPrincipal
    ) {
        userService.updateUserProfile(
                userPrincipal.getUserId(),
                userMapper.userDtoUpdateProfileToUser(requestBody)
        );
        return ResponseEntity.ok().body(ApiResponse.success("사용자 정보 업데이트 완료", requestBody));
    }

    /*
    회원 아이디 찾기(이메일로 인증번호 전송)
     */
    @PostMapping("/me/id")
    public ResponseEntity<?> meId(@Valid @RequestBody UserDto.MeEmail requestBody) {
        try {
            emailService.sendEmailWithTokenId(requestBody.getEmail(),"[KnockKnock] 회원 아이디 찾기 요청 이메일입니다.");
            return ResponseEntity.ok("이메일이 성공적으로 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 발송에 실패했습니다.");
        }
    }
    /*
    회원 아이디 찾기(인증번호 받으면 검증하고 이메일로 아이디 전송)
     */
    @PostMapping("/me/confirm-id")
    public ResponseEntity<?> meConfirmId(@Valid @RequestBody UserDto.MeEmailConfirm requestBody) throws MessagingException {
        try {
            boolean isTokenValid = emailService.verifyToken(requestBody.getRandomKey(), requestBody.getEmail());

            if (isTokenValid) {
                // Send the user ID to the email
                emailService.sendEmailWithId(requestBody.getEmail(), "[KnockKnock] 회원 아이디를 보내드립니다.");

                return ResponseEntity.ok("이메일을 성공적으로 전송했습니다.");
            } else {
                return ResponseEntity.badRequest().body(ApiResponse.unAuthorized());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("인증 처리 중 오류가 발생했습니다.");
        }
    }
    /*
    회원 비밀번호 찾기(인증번호 전송)
     */
    @PostMapping("/me/pw")
    public ResponseEntity<?> mePassword(@Valid @RequestBody UserDto.MePassword requestBody) throws MessagingException {
        try {
            boolean isIdValid = userService.verifyId(requestBody.getId());
            if(isIdValid){
                emailService.sendEmailWithTokenPw(requestBody.getEmail(),"[KnockKnock] 회원 비밀번호 찾기 요청 이메일입니다.");
                return ResponseEntity.ok("이메일이 성공적으로 발송되었습니다.");
            } else{
                return ResponseEntity.badRequest().body(ApiResponse.unAuthorized());
            }
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 발송에 실패했습니다.");
        }
    }
    /*
    회원 비밀번호 찾기(인증번호 받으면 검증하고 이메일로 아이디 전송)
     */
    @PostMapping("/me/confirm-pw")
    public ResponseEntity<?> meConfirmPassword(@Valid @RequestBody UserDto.MePasswordConfirm requestBody) throws MessagingException {
        try {
            boolean isTokenValid = emailService.verifyToken(requestBody.getRandomKey(), requestBody.getEmail());
            boolean isIdValid = userService.verifyId(requestBody.getId());
            if (isTokenValid && isIdValid) {
                // Send the user ID to the email
                emailService.sendEmailWithPw(requestBody.getEmail(), "[KnockKnock] 회원 비밀번호를 보내드립니다.");

                return ResponseEntity.ok("이메일을 성공적으로 전송했습니다.");
            } else{
                return ResponseEntity.badRequest().body(ApiResponse.unAuthorized());
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("인증 처리 중 오류가 발생했습니다.");
        }
    }
    /*
    회원 탈퇴 api
     */
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(HttpServletRequest request) {
        String accessToken = HeaderUtil.getAccessToken(request);
        return ResponseEntity.ok("회원 탈퇴가 성공적으로 이루어졌습니다.");
    }
}