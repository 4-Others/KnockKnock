package com.others.KnockKnock.domain.mail.controller;

import com.others.KnockKnock.domain.mail.dto.VerifyDto;
import com.others.KnockKnock.domain.mail.service.EmailService;
import com.others.KnockKnock.domain.user.dto.UserDto;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {
    private final EmailService emailService;
    private final UserService userService;

    public EmailController(EmailService emailService, UserService userService) {
        this.emailService = emailService;
        this.userService = userService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestParam String recipientEmail, @RequestParam String subject) {
        try {
            emailService.sendEmail(recipientEmail, subject);
            return ResponseEntity.ok("이메일이 성공적으로 발송되었습니다.");
        } catch (MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 발송에 실패했습니다.");
        }
    }
    @PostMapping("/verify")
    public ResponseEntity<String> verifyEmail(@Validated @RequestBody VerifyDto verifyDto) {
        String tokenOrKey = verifyDto.getTokenOrKey();
        String email = verifyDto.getEmail();
        String password = verifyDto.getPassword();

        try {
            emailService.verifyEmail(tokenOrKey, email, password);
            return ResponseEntity.ok("이메일 인증이 성공적으로 완료되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("인증 처리 중 오류가 발생했습니다.");
        }
    }
//    @PostMapping("/verify")
//    public ResponseEntity<String> verifyEmail(@RequestParam String tokenOrKey, @RequestParam String email, @RequestParam String password) {
//        try {
//            emailService.verifyEmail(tokenOrKey, email, password);
//
//            // 인증이 완료되면 회원가입 처리
//            UserDto.Signup signupDto = UserDto.Signup.builder()
//                    .email(email)
//                    .password(password)
//                    .build();
//            userService.signup(signupDto);
//
//            return ResponseEntity.ok("이메일 인증 및 회원가입이 완료되었습니다.");
//        } catch (IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }

}
