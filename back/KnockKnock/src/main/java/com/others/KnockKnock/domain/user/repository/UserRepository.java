package com.others.KnockKnock.domain.user.repository;

import com.others.KnockKnock.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(String id);
    User findUserById(String id);
    Optional<User> findByUserId(Long userId);
    User findUserByEmail(String email);
}
