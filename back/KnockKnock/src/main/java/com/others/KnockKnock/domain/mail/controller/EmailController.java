package com.others.KnockKnock.domain.mail.controller;

import com.others.KnockKnock.domain.mail.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

@RestController
@RequestMapping("/api/v1/emails")
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
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
    public ResponseEntity<String> verifyEmail(@RequestParam String tokenOrKey) {
        try {
            emailService.verifyEmail(tokenOrKey);
            return ResponseEntity.ok("이메일 인증이 완료되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // 기타 필요한 API 엔드포인트 추가 가능
}
