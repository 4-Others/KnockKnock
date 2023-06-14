package com.others.KnockKnock.domain.mail.service;

import com.others.KnockKnock.domain.mail.entity.EmailConfirmRandomKey;
import com.others.KnockKnock.domain.mail.entity.EmailConfirmToken;
import com.others.KnockKnock.domain.mail.repository.EmailConfirmRandomKeyRedisRepository;
import com.others.KnockKnock.domain.mail.repository.EmailConfirmTokenRepository;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import io.jsonwebtoken.io.IOException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.SecureRandom;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final EmailConfirmTokenRepository emailConfirmTokenRepository;
    private final EmailConfirmRandomKeyRedisRepository emailConfirmRandomKeyRedisRepository;
    private final TemplateEngine templateEngine;

    public EmailService(JavaMailSender javaMailSender, UserRepository userRepository, EmailConfirmTokenRepository emailConfirmTokenRepository, EmailConfirmRandomKeyRedisRepository emailConfirmRandomKeyRedisRepository) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.emailConfirmTokenRepository = emailConfirmTokenRepository;
        this.emailConfirmRandomKeyRedisRepository = emailConfirmRandomKeyRedisRepository;

        // Create and configure the template engine
        templateEngine = new SpringTemplateEngine();
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setPrefix("templates/"); // Set the prefix where email templates are located
        templateResolver.setSuffix(".html"); // Set the suffix for email templates
        templateResolver.setTemplateMode("HTML");
        templateResolver.setCharacterEncoding("UTF-8");
        templateEngine.setTemplateResolver(templateResolver);
    }
    public void sendEmail(String recipientEmail, String subject) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);

            // Get email template
            String emailTemplate = getEmailTemplate(recipientEmail, generateRandomKey(7));
            helper.setText(emailTemplate, true);

            javaMailSender.send(message);
            System.out.println("Email Template: " + emailTemplate);
        } catch (MessagingException e) {
            // 예외 처리 로직 작성
            e.printStackTrace(); // 예외 내용을 콘솔에 출력하거나 로깅할 수 있습니다.
            // 예외 처리 후 필요한 작업 수행
        }
    }

    public String generateRandomKey(int keyLength) {
        keyLength = 7;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder randomKey = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < keyLength; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            randomKey.append(characters.charAt(randomIndex));
        }

        return randomKey.toString();
    }
    public EmailConfirmRandomKey createEmailConfirmRandomKey(String email) {
        String randomKey = generateRandomKey(7);
        long expiration = 300L; // 5 minutes (in milliseconds)

        EmailConfirmRandomKey emailConfirmRandomKey = EmailConfirmRandomKey.builder()
                .id(email)
                .randomKey(randomKey)
                .expiration(expiration)
                .build();

        emailConfirmRandomKeyRedisRepository.save(emailConfirmRandomKey);

        return emailConfirmRandomKey;
    }
    public void verifyEmail(String tokenOrKey) {
        EmailConfirmToken token = emailConfirmTokenRepository.findByToken(tokenOrKey)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 토큰입니다."));

        // 토큰이 만료되었는지 확인
        if (token.isExpired()) {
            throw new IllegalArgumentException("토큰이 만료되었습니다.");
        }

        // 인증 처리 로직 수행
        String userEmail = token.getEmail();
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        user.setEmailVerified(true);
        userRepository.save(user);

        // 토큰 삭제
        emailConfirmTokenRepository.delete(token);
    }
//    public String getEmailTemplate(String recipientEmail, String randomKey) {
//        try {
//            // Read the email template file
//            ClassPathResource resource = new ClassPathResource("email_template.html");
//            byte[] fileData = FileCopyUtils.copyToByteArray(resource.getInputStream());
//            String template = new String(fileData);
//
//            // Replace placeholders with actual values
//            template = template.replace("${recipientEmail}", recipientEmail);
//            template = template.replace("${randomKey}", randomKey);
//
//            return template;
//        } catch (IOException e) {
//            throw new RuntimeException("Failed to read email template.", e);
//        } catch (java.io.IOException e) {
//            throw new RuntimeException(e);
//        }
//    }
    public String getEmailTemplate(String recipientEmail, String randomKey) {
        try {
            // Create the Thymeleaf context and set variables
            Context context = new Context();
            context.setVariable("recipientEmail", recipientEmail);
            context.setVariable("randomKey", randomKey);

            // Process the email template using the template engine
            String emailTemplate = templateEngine.process("email_template", context);

            return emailTemplate;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process email template.", e);
        }
    }
    public void updateEmailVerificationStatus(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));
        user.setEmailVerified(true);
        userRepository.save(user);
    }
}
