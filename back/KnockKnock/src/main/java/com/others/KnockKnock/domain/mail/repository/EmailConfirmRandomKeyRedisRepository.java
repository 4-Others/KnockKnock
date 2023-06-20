package com.others.KnockKnock.domain.mail.repository;

import com.others.KnockKnock.domain.mail.entity.EmailConfirmRandomKey;
import org.springframework.data.repository.CrudRepository;

public interface EmailConfirmRandomKeyRedisRepository extends CrudRepository<EmailConfirmRandomKey, String> {

}
