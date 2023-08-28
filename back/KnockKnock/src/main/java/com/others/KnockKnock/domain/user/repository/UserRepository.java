package com.others.KnockKnock.domain.user.repository;

import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.status.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(String id);

    Optional<User> findByUserId(Long userId);
    List<User> findByLastLoggedInBeforeAndStatus(LocalDateTime lastLoggedIn, Status status);

    List<User> findByLastLoggedInBefore(LocalDateTime oneYearAgo);
}
