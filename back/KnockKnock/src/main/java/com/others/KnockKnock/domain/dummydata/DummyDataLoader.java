package com.others.KnockKnock.domain.dummydata;

import com.others.KnockKnock.domain.notification.entity.Notification;
import com.others.KnockKnock.domain.notification.repository.NotificationRepository;
import com.others.KnockKnock.domain.schedule.entity.Schedule;
import com.others.KnockKnock.domain.schedule.repository.ScheduleRepository;
import com.others.KnockKnock.domain.tag.entity.Tag;
import com.others.KnockKnock.domain.tag.repository.TagRepository;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.security.oauth.entity.ProviderType;
import com.others.KnockKnock.security.oauth.entity.RoleType;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

//@Component
public class DummyDataLoader implements CommandLineRunner {

    private final ScheduleRepository scheduleRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final PasswordEncoder passwordEncoder;

    public DummyDataLoader(ScheduleRepository scheduleRepository, NotificationRepository notificationRepository, UserRepository userRepository, TagRepository tagRepository, PasswordEncoder passwordEncoder) {
        this.scheduleRepository = scheduleRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) throws Exception {
        String encryptedPassword1 = passwordEncoder.encode("ADSDSDS12!!");
        LocalDate birth1 = LocalDate.of(1996, 12, 12);
        User user1 = User.builder()
                         .id("tester123")
                         .username("tester")
                         .email("john@example.com")
                         .password(encryptedPassword1)
                         .emailVerifiedYn("Y")
                         .birth(birth1)
                         .pushAgree(true)
                         .createdAt(LocalDateTime.now())
                         .modifiedAt(LocalDateTime.now())
                         .roleType(RoleType.USER)
                         .providerType(ProviderType.LOCAL)
                         .build();
        userRepository.save(user1);

        String encryptedPassword2 = passwordEncoder.encode("ADSDS126@@#");
        LocalDate birth2 = LocalDate.of(1994, 06, 16);
        User user2 = User.builder()
                         .id("tester1234")
                         .username("tester")
                         .email("thisissample@gmail.com")
                         .password(encryptedPassword2)
                         .emailVerifiedYn("Y")
                         .birth(birth2)
                         .pushAgree(true)
                         .createdAt(LocalDateTime.now())
                         .modifiedAt(LocalDateTime.now())
                         .roleType(RoleType.USER)
                         .providerType(ProviderType.LOCAL)
                         .build();
        userRepository.save(user2);

        Tag tag1 = Tag.builder()
                .name("Tag1")
                .color("red")
                .build();
        tagRepository.save(tag1);

        Tag tag2 = Tag.builder()
                .name("Tag2")
                .color("yellow")
                .build();
        tagRepository.save(tag2);

        Tag tag3 = Tag.builder()
                .name("Tag3")
                .color("blue")
                .build();
        tagRepository.save(tag3);


        Schedule schedule1 = Schedule.builder().title("Meeting")
                                 .content("this is schedule1")
                                 .period(Schedule.Period.SPECIFIC_TIME)
                                 .startAt("2023-08-07 12:00")
                                 .endAt("2023-08-07 13:00")
                                 .complete(false)
                                 .alerts(Arrays.asList(15, 30, 60))
                                 .user(user1)
                                 .tag(Arrays.asList(tag1,tag2))
                                 .build();
        scheduleRepository.save(schedule1);

        Schedule schedule2 = Schedule.builder()
                                 .content("this is schedule2")
                                 .period(Schedule.Period.SPECIFIC_TIME)
                                 .startAt("2023-08-07 10:00")
                                 .endAt("2023-08-07 11:00")
                                 .complete(false)
                                 .alerts(Arrays.asList(15, 30, 60))
                                 .user(user2)
                                 .tag(Arrays.asList(tag3))
                                 .build();
        scheduleRepository.save(schedule2);

        Notification notification1 = Notification.builder()
                                         .title("WorkOut")
                                         .notifyAt("2023-08-07 09:45")
                                         .delivered(false)
                                         .isRead(false)
                                         .schedule(schedule1)
                                         .user(user1)
                                         .build();
        notificationRepository.save(notification1);

        Notification notification2 = Notification.builder()
                                         .title("Study")
                                         .notifyAt("2023-08-07 09:45")
                                         .delivered(false)
                                         .isRead(false)
                                         .schedule(schedule2)
                                         .user(user2)
                                         .build();
        notificationRepository.save(notification2);
    }
}
