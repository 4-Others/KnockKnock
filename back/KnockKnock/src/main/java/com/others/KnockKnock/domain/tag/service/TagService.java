package com.others.KnockKnock.domain.tag.service;

import com.others.KnockKnock.domain.tag.dto.TagDto;
import com.others.KnockKnock.domain.tag.entity.Tag;
import com.others.KnockKnock.domain.tag.mapper.TagMapper;
import com.others.KnockKnock.domain.tag.repository.TagRepository;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.exception.BusinessLogicException;
import com.others.KnockKnock.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    private final UserRepository userRepository;

    public TagDto.ResponseWithScheduleCount createTag(Long userId, TagDto.Post tag) {
        Optional<User> byEmail = userRepository.findByUserId(userId);
        User user = byEmail.get();

        verifyExistsTagName(user.getUserId(), tag.getName());

        Tag build = Tag.builder()
                        .name(tag.getName())
                        .color(tag.getColor())
                        .user(user)
                        .build();

        Tag createdTag = tagRepository.save(build);

        return tagMapper.tagToTagDtoResponseWithScheduleCount(createdTag);
    }

    public TagDto.ResponseWithScheduleCount updateTag(Long userId, Long tagId, TagDto.Patch tag) {
        Tag findTag = findTagByUserIdAndTagId(userId, tagId);
        Tag buildTag = Tag.builder()
                        .name(tag.getName())
                        .color(tag.getColor())
                        .build();

        Tag mergedTag = mergeTagInfo(findTag, buildTag);
        Tag updatedTag = tagRepository.save(mergedTag);

        return tagMapper.tagToTagDtoResponseWithScheduleCount(updatedTag);
    }

    public void deleteTag(Long userId, Long tagId) {
        Tag tagByUserIdAndTagId = findTagByUserIdAndTagId(userId, tagId);

        tagRepository.delete(tagByUserIdAndTagId);
    }

    public List<TagDto.ResponseWithScheduleCount> findAllTag(Long userId) {
        List<Tag> allTagByUserId = tagRepository.findAllTagByUserId(userId);

        return tagMapper.tagListToTagDtoResponseWithScheduleCountList(allTagByUserId);
    }

    public TagDto.ResponseWithSchedules findTag(Long userId, Long tagId) {
        Tag findTag = findTagByUserIdAndTagId(userId, tagId);

        return tagMapper.tagToTagDtoResponseWithSchedules(findTag);
    }

    @Transactional(readOnly = true)
    public Tag findTagByUserIdAndTagId(Long userId, Long tagId) {
        Optional<Tag> byId = tagRepository.findByUserIdAndTagId(userId, tagId);

        return byId.orElseThrow(() -> new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
    }

    @Transactional(readOnly = true)
    public void verifyExistsTagName(Long userId, String tagName) {
        Optional<Tag> byUserIdAndTagName = tagRepository.findByUserIdAndTagName(userId, tagName);

        byUserIdAndTagName.ifPresent((e) -> {
            throw new BusinessLogicException(ExceptionCode.ALREADY_EXISTS_INFORMATION);
        });
    }

    public Tag mergeTagInfo(Tag destination, Tag source) {
        if (destination == null || source == null) {
            return null;
        }

        return Optional.of(destination)
                   .map(dest -> {
                           Tag build = dest.toBuilder()
                                                .name(source.getName() != null ? source.getName() : dest.getName())
                                                .color(source.getColor() != null ? source.getColor() : dest.getColor())
                                                .build();

                           build.setCreatedAt(dest.getCreatedAt());

                           return build;
                       }
                   )
                   .orElse(null);
    }
}
