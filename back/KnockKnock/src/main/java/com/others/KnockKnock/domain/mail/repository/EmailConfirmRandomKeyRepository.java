package com.others.KnockKnock.domain.mail.repository;

import com.others.KnockKnock.domain.mail.entity.EmailConfirmRandomKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailConfirmRandomKeyRepository extends JpaRepository<EmailConfirmRandomKey, String> {
    Optional<EmailConfirmRandomKey> findByEmail(String email);
}
