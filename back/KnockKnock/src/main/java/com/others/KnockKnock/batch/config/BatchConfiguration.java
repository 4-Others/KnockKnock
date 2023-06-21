package com.others.KnockKnock.batch.config;

import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.batch.core.launch.support.RunIdIncrementer;
//import org.springframework.batch.item.ItemProcessor;
//import org.springframework.batch.item.ItemReader;
//import org.springframework.batch.item.ItemWriter;
//
//import org.springframework.batch.item.data.RepositoryItemReader;
//import org.springframework.batch.item.data.builder.RepositoryItemReaderBuilder;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.domain.Sort;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//
//import java.time.LocalDateTime;
//import java.util.Collections;
//import java.util.List;
//
//
//@Configuration
//@EnableBatchProcessing
//public class BatchConfiguration {
//    private final JobBuilderFactory jobBuilderFactory;
//    private final StepBuilderFactory stepBuilderFactory;
//    private final UserRepository userRepository;
//
//    public BatchConfiguration(JobBuilderFactory jobBuilderFactory, StepBuilderFactory stepBuilderFactory, UserRepository userRepository) {
//        this.jobBuilderFactory = jobBuilderFactory;
//        this.stepBuilderFactory = stepBuilderFactory;
//        this.userRepository = userRepository;
//    }
//
//    @Bean
//    public Step inactiveAccountsStep() {
//        return stepBuilderFactory.get("inactiveAccountsStep")
//                .<User, User>chunk(10)
//                .reader(inactiveAccountsReader())
//                .processor(inactiveAccountsProcessor())
//                .writer(inactiveAccountsWriter())
//                .build();
//    }
//
////    @Bean
////    public ItemReader<User> inactiveAccountsReader() {
////        LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
////        return new RepositoryItemReaderBuilder<User>()
////                .name("inactiveAccountsReader")
////                .repository(userRepository)
////                .methodName("findByLastLoggedInBeforeAndActiveIsTrue")
////                .arguments(Collections.singletonList(oneYearAgo))
////                .sorts(Collections.singletonMap("userId", Sort.Direction.ASC))
////                .saveState(false)
////                .build();
////    }
//@Bean
//public RepositoryItemReader<User> inactiveAccountsReader() {
//    LocalDateTime oneYearAgo = LocalDateTime.now().minusYears(1);
//    return new RepositoryItemReaderBuilder<User>()
//            .name("inactiveAccountsReader")
//            .repository(userRepository)
//            .methodName("findByLastLoggedInBeforeAndActiveIsTrue")
//            .arguments(Collections.singletonList(oneYearAgo))
//            .sorts(Collections.singletonMap("userId", Sort.Direction.ASC))
//            .pageSize(10)  // 페이지 크기 설정 (optional)
//            .build();
//}
//    @Bean
//    public ItemProcessor<User, User> inactiveAccountsProcessor() {
//        return user -> {
//            user.setActive(false);
//            // 추가 휴면 계정 처리 로직
//            return user;
//        };
//    }
//
//    @Bean
//    public ItemWriter<User> inactiveAccountsWriter() {
//        return users -> userRepository.saveAll(users);
//    }
//
//    @Bean
//    public Job inactiveAccountsJob(Step inactiveAccountsStep) {
//        return jobBuilderFactory.get("inactiveAccountsJob")
//                .incrementer(new RunIdIncrementer())
//                .flow(inactiveAccountsStep)
//                .end()
//                .build();
//    }
//}

