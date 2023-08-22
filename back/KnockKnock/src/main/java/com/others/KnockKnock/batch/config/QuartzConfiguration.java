//package com.others.KnockKnock.batch.config;

//import com.others.KnockKnock.batch.job.SampleJob;
//import org.quartz.CronExpression;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.scheduling.quartz.CronTriggerFactoryBean;
//import org.springframework.scheduling.quartz.JobDetailFactoryBean;
//import org.springframework.scheduling.quartz.SchedulerFactoryBean;
//import org.springframework.scheduling.quartz.SimpleTriggerFactoryBean;
//
//import java.text.ParseException;
//import java.time.LocalDateTime;

//@Configuration
//public class QuartzConfiguration {
//
//    @Bean
//    public JobDetailFactoryBean jobDetailFactoryBean() {
//        JobDetailFactoryBean factoryBean = new JobDetailFactoryBean();
//        factoryBean.setJobClass(SampleJob.class);
//        factoryBean.setDurability(true);
//        return factoryBean;
//    }
//
//    @Bean
//    public CronTriggerFactoryBean cronTriggerFactoryBean(JobDetailFactoryBean jobDetailFactoryBean) {
//        CronTriggerFactoryBean factoryBean = new CronTriggerFactoryBean();
//        factoryBean.setJobDetail(jobDetailFactoryBean.getObject());
//        factoryBean.setStartDelay(0); // 즉시 시작
//        factoryBean.setCronExpression("0 0 0 * * ?"); // 매일 자정에 실행
//        return factoryBean;
//    }
//
//    @Bean
//    public SchedulerFactoryBean schedulerFactoryBean(CronTriggerFactoryBean cronTriggerFactoryBean) {
//        SchedulerFactoryBean factoryBean = new SchedulerFactoryBean();
//        factoryBean.setTriggers(cronTriggerFactoryBean.getObject());
//        return factoryBean;
//    }
//}
    /*
    @Bean
    public SimpleTriggerFactoryBean simpleTriggerFactoryBean(JobDetailFactoryBean jobDetailFactoryBean) {
        SimpleTriggerFactoryBean factoryBean = new SimpleTriggerFactoryBean();
        factoryBean.setJobDetail(jobDetailFactoryBean.getObject());
        factoryBean.setStartDelay(60000); // 1분 지연 설정
        factoryBean.setRepeatCount(-1); // 한 번만 실행하도록 설정
        factoryBean.setRepeatInterval(86400000); // 반복 간격 설정 24시간마다 반복함
        return factoryBean;
    }

    @Bean
    public SchedulerFactoryBean schedulerFactoryBean(SimpleTriggerFactoryBean simpleTriggerFactoryBean) {
        SchedulerFactoryBean factoryBean = new SchedulerFactoryBean();
        factoryBean.setTriggers(simpleTriggerFactoryBean.getObject());
        return factoryBean;
    }
    주석처리한 코드는 애플리케이션 시작한기준으로 24시간마다 스케줄링 무한반복함. 안한 코드는 매일 자정에 시작함.
    */

