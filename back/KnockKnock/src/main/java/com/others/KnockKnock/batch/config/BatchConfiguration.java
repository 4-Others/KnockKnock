package com.others.KnockKnock.batch.config;

import com.others.KnockKnock.batch.job.InactiveUserItemProcessor;
import com.others.KnockKnock.batch.job.InactiveUserItemReader;
import com.others.KnockKnock.batch.job.InactiveUserItemWriter;
import com.others.KnockKnock.domain.user.entity.User;
import com.others.KnockKnock.domain.user.repository.UserRepository;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
//@EnableBatchProcessing
//public class BatchConfiguration {
//
//    private final JobBuilderFactory jobBuilderFactory;
//    private final StepBuilderFactory stepBuilderFactory;
//    private final UserRepository userRepository;
//
//    public BatchConfiguration(JobBuilderFactory jobBuilderFactory,
//                              StepBuilderFactory stepBuilderFactory,
//                              UserRepository userRepository) {
//        this.jobBuilderFactory = jobBuilderFactory;
//        this.stepBuilderFactory = stepBuilderFactory;
//        this.userRepository = userRepository;
//    }
//
//    @Bean
//    public ItemReader<User> inactiveUserItemReader() {
//        return new InactiveUserItemReader(userRepository);
//    }
//
//    @Bean
//    public ItemProcessor<User, User> inactiveUserItemProcessor() {
//        return new InactiveUserItemProcessor();
//    }
//
//    @Bean
//    public ItemWriter<User> inactiveUserItemWriter() {
//        return new InactiveUserItemWriter(userRepository);
//    }
//    @Bean
//    public Step inactiveUserProcessingStep(ItemReader<User> reader,
//                                           ItemProcessor<User, User> processor,
//                                           ItemWriter<User> writer) {
//        return stepBuilderFactory.get("inactiveUserProcessingStep")
//                .<User, User>chunk(10)
//                .reader(reader)
//                .processor(processor)
//                .writer(writer)
//                .build();
//    }
//
//    @Bean
//    public Job inactiveUserProcessingJob(Step inactiveUserProcessingStep) {
//        return jobBuilderFactory.get("inactiveUserProcessingJob")
//                .incrementer(new RunIdIncrementer())
//                .flow(inactiveUserProcessingStep)
//                .end()
//                .build();
//    }
//}