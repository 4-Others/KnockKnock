package com.others.KnockKnock.domain.user.controller;

import com.others.KnockKnock.common.ApiResponse;
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
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

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
    회원 탈퇴 api
     */
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteUser(HttpServletRequest request) {
        String accessToken = HeaderUtil.getAccessToken(request);
        return ResponseEntity.ok("회원 탈퇴가 성공적으로 이루어졌습니다.");
    }
}