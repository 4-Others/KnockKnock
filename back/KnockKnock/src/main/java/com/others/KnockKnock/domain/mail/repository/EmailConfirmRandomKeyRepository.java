package com.others.KnockKnock.domain.mail.repository;

import com.others.KnockKnock.domain.mail.entity.EmailConfirmRandomKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailConfirmRandomKeyRepository extends JpaRepository<EmailConfirmRandomKey, String> {
    // H2에 저장된 EmailConfirmRandomKey를 조회하기 위한 메서드 정의
    Optional<EmailConfirmRandomKey> findByEmail(String email);
}
