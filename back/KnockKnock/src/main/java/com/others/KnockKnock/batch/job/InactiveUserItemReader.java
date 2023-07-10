package com.others.KnockKnock.batch.job;

import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import org.springframework.batch.item.*;

import java.time.LocalDateTime;
import java.util.List;

public class InactiveUserItemReader implements ItemReader<User> {

    private final UserRepository userRepository;

    public InactiveUserItemReader(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {
        // Query users with lastLoggedIn older than 1 year
        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
        List<User> inactiveUsers = userRepository.findByLastLoggedInBefore(oneYearAgo);

        if (inactiveUsers.isEmpty()) {
            System.out.println("No inactive users found.");
            return null; // No more inactive users
        }

        return inactiveUsers.remove(0);
    }
}

