package com.others.KnockKnock.domain.mail.service;

import com.others.KnockKnock.domain.mail.entity.EmailConfirmRandomKey;
import com.others.KnockKnock.domain.mail.repository.EmailConfirmRandomKeyRepository;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.SecureRandom;
import java.util.Optional;

@Service
public class EmailService {
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final EmailConfirmRandomKeyRepository emailConfirmRandomKeyRepository;
    private final TemplateEngine templateEngine;
    private final PasswordEncoder passwordEncoder;

    public EmailService(JavaMailSender javaMailSender, UserRepository userRepository, EmailConfirmRandomKeyRepository emailConfirmRandomKeyRepository, PasswordEncoder passwordEncoder) {
        this.javaMailSender = javaMailSender;
        this.userRepository = userRepository;
        this.emailConfirmRandomKeyRepository = emailConfirmRandomKeyRepository;
        this.passwordEncoder = passwordEncoder;


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
            String randomKey = generateRandomKey(7);
            // EmailConfirmRandomKey 저장
            EmailConfirmRandomKey confirmRandomKey = EmailConfirmRandomKey.builder()
                    .email(recipientEmail)
                    .randomKey(randomKey)
                    .build();
            emailConfirmRandomKeyRepository.save(confirmRandomKey);
            // Get email template
            String emailTemplate = getEmailTemplate(recipientEmail, randomKey);
            helper.setText(emailTemplate, true);

            javaMailSender.send(message);
            System.out.println("Email Template: " + emailTemplate);
        } catch (MessagingException e) {
            // 예외 처리 로직 작성
            e.printStackTrace(); // 예외 내용을 콘솔에 출력하거나 로깅할 수 있습니다.
            // 예외 처리 후 필요한 작업 수행
        }
    }
    public void sendEmailWithId(String recipientEmail, String subject) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            User user = userRepository.findUserByEmail(recipientEmail);
            String id = user.getId();
            // Get email template
            String emailTemplate = getEmailIdTemplate(recipientEmail, id);
            helper.setText(emailTemplate, true);

            javaMailSender.send(message);
            System.out.println("Email Template: " + emailTemplate);
        } catch (MessagingException e) {
            // 예외 처리 로직 작성
            e.printStackTrace(); // 예외 내용을 콘솔에 출력하거나 로깅할 수 있습니다.
            // 예외 처리 후 필요한 작업 수행
        }
    }
    public void sendEmailWithTokenId(String recipientEmail, String subject) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            String randomKey = generateRandomKey(7);
            // EmailConfirmRandomKey 저장
            EmailConfirmRandomKey confirmRandomKey = EmailConfirmRandomKey.builder()
                    .email(recipientEmail)
                    .randomKey(randomKey)
                    .build();
            emailConfirmRandomKeyRepository.save(confirmRandomKey);
            // Get email template
            String emailTemplate = getEmailIdTokenTemplate(recipientEmail, randomKey);
            helper.setText(emailTemplate, true);

            javaMailSender.send(message);
            System.out.println("Email Template: " + emailTemplate);
        } catch (MessagingException e) {
            // 예외 처리 로직 작성
            e.printStackTrace(); // 예외 내용을 콘솔에 출력하거나 로깅할 수 있습니다.
            // 예외 처리 후 필요한 작업 수행
        }
    }
    //임시비밀번호 생성해서, 보내주기.
    public void sendEmailWithPw(String recipientEmail, String subject) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            User user = userRepository.findUserByEmail(recipientEmail);
            String pw = generatePassword(8);
            user.setPassword(passwordEncoder.encode(pw));
            userRepository.save(user);
            // Get email template
            String emailTemplate = getEmailPwTemplate(recipientEmail, pw);
            helper.setText(emailTemplate, true);

            javaMailSender.send(message);
            System.out.println("Email Template: " + emailTemplate);
        } catch (MessagingException e) {
            // 예외 처리 로직 작성
            e.printStackTrace(); // 예외 내용을 콘솔에 출력하거나 로깅할 수 있습니다.
            // 예외 처리 후 필요한 작업 수행
        }
    }
    public void sendEmailWithTokenPw(String recipientEmail, String subject) throws MessagingException {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(recipientEmail);
            helper.setSubject(subject);
            String randomKey = generateRandomKey(7);
            // EmailConfirmRandomKey 저장
            EmailConfirmRandomKey confirmRandomKey = EmailConfirmRandomKey.builder()
                    .email(recipientEmail)
                    .randomKey(randomKey)
                    .build();
            emailConfirmRandomKeyRepository.save(confirmRandomKey);
            // Get email template
            String emailTemplate = getEmailPwTokenTemplate(recipientEmail, randomKey);
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
        //keyLength = 7;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        StringBuilder randomKey = new StringBuilder();

        SecureRandom secureRandom = new SecureRandom();
        for (int i = 0; i < keyLength; i++) {
            int randomIndex = secureRandom.nextInt(characters.length());
            randomKey.append(characters.charAt(randomIndex));
        }

        return randomKey.toString();
    }
    public String generatePassword(int keyLength) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_+=<>?";
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
                .email(email)
                .randomKey(randomKey)
                .expiration(expiration)
                .build();

        emailConfirmRandomKeyRepository.save(emailConfirmRandomKey);

        return emailConfirmRandomKey;
    }

    public void verifyEmail(String tokenOrKey, String email, String password) {
        // 이메일 검증 로직 수행
        EmailConfirmRandomKey emailConfirmRandomKey = emailConfirmRandomKeyRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 이메일입니다."));

        String randomKey = emailConfirmRandomKey.getRandomKey();

        if (!randomKey.equals(tokenOrKey)) {
            throw new IllegalArgumentException("인증 코드가 유효하지 않습니다.");
        }
        Optional<User> existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            // 기존 사용자의 정보 업데이트
            User user = existingUser.get();
            user.setPassword(passwordEncoder.encode(password));
            user.setEmailVerifiedYn("Y"); // 이메일 인증 완료로 설정
            userRepository.save(user);
        } else {
            // 새로운 사용자 등록
            User user = User.builder()
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .emailVerifiedYn("Y") // 이메일 인증 완료로 설정
                    .build();
            userRepository.save(user);
        }
        // 토큰 삭제
        emailConfirmRandomKeyRepository.deleteById(email);
    }
    public boolean verifyToken(String token, String email) {
        // 이메일 검증 로직 수행
        Optional<EmailConfirmRandomKey> emailRandomKeyOptional = emailConfirmRandomKeyRepository.findById(email);

        if (emailRandomKeyOptional.isPresent()) {
            EmailConfirmRandomKey emailConfirmRandomKey = emailRandomKeyOptional.get();
            String randomKey = emailConfirmRandomKey.getRandomKey();

            if (randomKey.equals(token)) {
                emailConfirmRandomKeyRepository.deleteById(email);
                return true;  // 인증 성공
            }
        }

        return false;  // 인증 실패
    }
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
    public String getEmailIdTemplate(String recipientEmail, String id) {
        try {
            // Create the Thymeleaf context and set variables
            Context context = new Context();
            context.setVariable("recipientEmail", recipientEmail);
            context.setVariable("userID", id);

            // Process the email template using the template engine
            String emailTemplate = templateEngine.process("email_ID_template", context);

            return emailTemplate;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process email template.", e);
        }
    }
    public String getEmailIdTokenTemplate(String recipientEmail, String randomKey) {
        try {
            // Create the Thymeleaf context and set variables
            Context context = new Context();
            context.setVariable("recipientEmail", recipientEmail);
            context.setVariable("randomKey", randomKey);

            // Process the email template using the template engine
            String emailTemplate = templateEngine.process("email_ID_token_template", context);

            return emailTemplate;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process email template.", e);
        }
    }
    public String getEmailPwTemplate(String recipientEmail, String password) {
        try {
            // Create the Thymeleaf context and set variables
            Context context = new Context();
            context.setVariable("recipientEmail", recipientEmail);
            context.setVariable("userPW", password);

            // Process the email template using the template engine
            String emailTemplate = templateEngine.process("email_PW_template", context);

            return emailTemplate;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process email template.", e);
        }
    }
    public String getEmailPwTokenTemplate(String recipientEmail, String randomKey) {
        try {
            // Create the Thymeleaf context and set variables
            Context context = new Context();
            context.setVariable("recipientEmail", recipientEmail);
            context.setVariable("randomKey", randomKey);

            // Process the email template using the template engine
            String emailTemplate = templateEngine.process("email_PW_token_template", context);

            return emailTemplate;
        } catch (Exception e) {
            throw new RuntimeException("Failed to process email template.", e);
        }
    }
}
