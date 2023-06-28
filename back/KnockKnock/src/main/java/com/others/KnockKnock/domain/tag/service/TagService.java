package com.others.KnockKnock.domain.tag.service;

import com.others.KnockKnock.domain.calendar.entity.Calendar;
import com.others.KnockKnock.domain.tag.entity.Tag;
import com.others.KnockKnock.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public void createTag(Calendar calendar, Map<String, String> tag) {
        if (!tag.isEmpty()) {
            Tag build = Tag.builder()
                            .name(tag.get("name"))
                            .color(tag.get("color"))
                            .build();

            build.addCalendar(calendar);

            tagRepository.save(build);
        }
    }

    public void updateTag(Calendar calendar, Map<String, String> tag) {
        if (calendar.getTag().size() != 0) {
            ArrayList<Tag> tags = new ArrayList<>(calendar.getTag());

            tags.forEach(Tag::removeCalendar);

            deleteTag(tags);
        }

        if (!tag.isEmpty()) {
            Tag build = Tag.builder()
                            .name(tag.get("name"))
                            .color(tag.get("color"))
                            .build();

            build.updateCalendar(calendar);

            tagRepository.save(build);
        }
    }

    public void deleteTag(List<Tag> tags) {
        tagRepository.deleteAll(tags);
    }
}
