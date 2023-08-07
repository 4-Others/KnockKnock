package com.others.KnockKnock.domain.dummydata;

import com.others.KnockKnock.domain.notification.entity.Notification;
import com.others.KnockKnock.domain.notification.repository.NotificationRepository;
import com.others.KnockKnock.domain.schedule.entity.Schedule;
import com.others.KnockKnock.domain.schedule.repository.ScheduleRepository;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import com.others.KnockKnock.domain.user.status.Status;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DummyDataLoader implements CommandLineRunner {

    private final ScheduleRepository scheduleRepository;
    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public DummyDataLoader(ScheduleRepository scheduleRepository, NotificationRepository notificationRepository, UserRepository userRepository) {
        this.scheduleRepository = scheduleRepository;
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }


    @Override
    public void run(String... args) throws Exception {
        User user1 = User.builder()
                .email("john@example.com")
                .password("ADSDSDS12!!")
                .status(Status.ACTIVE)
                .emailVerified(true)
                .lastLoggedIn(LocalDateTime.now())
                .build();
        userRepository.save(user1);

        User user2 = User.builder()
                .email("adsds126@gmail.com")
                .password("ADSDS126@@#")
                .status(Status.ACTIVE)
                .emailVerified(true)
                .lastLoggedIn(LocalDateTime.now())
                .build();
        userRepository.save(user2);

        Schedule schedule1 = Schedule.builder().title("Meeting")
                .content("this is schedule1")
                .period(Schedule.Period.SPECIFIC_TIME)
                .startAt("2023-08-07 12:00")
                .endAt("2023-08-07 13:00")
                .complete(false)
                .alerts(Arrays.asList(15, 30, 60))
                .user(user1)
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
                .build();
        scheduleRepository.save(schedule2);

        Notification notification1 = Notification.builder()
                .title("WorkOut")
                .notifyAt("2023-08-07 09:45")
                .delivered(false)
                .read(false)
                .schedule(schedule1)
                .user(user1)
                .build();
        notificationRepository.save(notification1);

        Notification notification2 = Notification.builder()
                .title("Study")
                .notifyAt("2023-08-07 09:45")
                .delivered(false)
                .read(false)
                .schedule(schedule2)
                .user(user2)
                .build();
        notificationRepository.save(notification2);
    }
}
