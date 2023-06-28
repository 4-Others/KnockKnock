package com.others.KnockKnock.domain.tag.repository;

import com.others.KnockKnock.domain.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
