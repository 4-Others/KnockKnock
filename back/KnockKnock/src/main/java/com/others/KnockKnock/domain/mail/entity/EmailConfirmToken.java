package com.others.KnockKnock.domain.mail.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

//@Entity
//@Getter
//@Setter
//public class EmailConfirmToken {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String token;
//    private String email;
//    private LocalDateTime expiration;
//
//    // 생성자, Getter, Setter, 기타 필요한 메소드들
//
//    public EmailConfirmToken() {
//
//    }
//
//    public EmailConfirmToken(String token, String email, LocalDateTime expiration) {
//        this.token = token;
//        this.email = email;
//        this.expiration = expiration;
//    }
//
//    public boolean isExpired() {
//        return LocalDateTime.now().isAfter(expiration);
//    }
//}

