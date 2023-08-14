//package com.others.KnockKnock.batch.job;
//
//import com.others.KnockKnock.domain.user.entity.User;
//import com.others.KnockKnock.domain.user.repository.UserRepository;
//import org.springframework.batch.item.ItemWriter;
//
//import java.util.List;
//
//public class InactiveUserItemWriter implements ItemWriter<User> {
//
//    private final UserRepository userRepository;
//
//    public InactiveUserItemWriter(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public void write(List<? extends User> users) throws Exception {
//        userRepository.saveAll(users);
//    }
//}

