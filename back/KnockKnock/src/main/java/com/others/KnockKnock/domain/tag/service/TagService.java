package com.others.KnockKnock.domain.tag.service;

import com.others.KnockKnock.domain.schedule.entity.Schedule;
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

    public void createTag(Schedule schedule, Map<String, String> tag) {
        if (!tag.isEmpty()) {
            Tag build = Tag.builder()
                            .name(tag.get("name"))
                            .color(tag.get("color"))
                            .build();

            build.addCalendar(schedule);

            tagRepository.save(build);
        }
    }

    public void updateTag(Schedule schedule, Map<String, String> tag) {
        if (schedule.getTag().size() != 0) {
            ArrayList<Tag> tags = new ArrayList<>(schedule.getTag());

            tags.forEach(Tag::removeCalendar);

            deleteTag(tags);
        }

        if (!tag.isEmpty()) {
            Tag build = Tag.builder()
                            .name(tag.get("name"))
                            .color(tag.get("color"))
                            .build();

            build.updateCalendar(schedule);

            tagRepository.save(build);
        }
    }

    public void deleteTag(List<Tag> tags) {
        tagRepository.deleteAll(tags);
    }
}
