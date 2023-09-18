package com.others.KnockKnock.domain.tag.repository;

import com.others.KnockKnock.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    @Query("SELECT t FROM Tag t where t.user.userId = :userId")
    List<Tag> findAllTagByUserId(Long userId);

    @Query("SELECT t from Tag t where t.user.userId = :userId AND t.tagId = :tagId")
    Optional<Tag> findByUserIdAndTagId(Long userId, Long tagId);

    @Query("SELECT t from Tag t where t.user.userId = :userId AND t.name = :tagName")
    Optional<Tag> findByUserIdAndTagName(Long userId, String tagName);
}
