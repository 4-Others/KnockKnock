//package com.others.KnockKnock.batch.job;
//
//import lombok.NoArgsConstructor;
//import org.quartz.JobExecutionContext;
//import org.quartz.JobExecutionException;
//import org.quartz.Scheduler;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.JobExecution;
//import org.springframework.batch.core.JobParameters;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.scheduling.quartz.QuartzJobBean;
//
//public class SampleJob extends QuartzJobBean {
//    private final JobLauncher jobLauncher;
//    private final Job inactiveUserProcessingJob;
//
//    public SampleJob(JobLauncher jobLauncher, Job inactiveUserProcessingJob) {
//        this.jobLauncher = jobLauncher;
//        this.inactiveUserProcessingJob = inactiveUserProcessingJob;
//    }
////    public SampleJob() {
////        this.jobLauncher = null;
////        this.inactiveUserProcessingJob = null;
////    }
//
//    @Override
//    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
//        try {
//            // 비즈니스 로직 실행
//            JobExecution jobExecution = jobLauncher.run(inactiveUserProcessingJob, new JobParameters());
//
//            // 로그 출력
//            System.out.println("Scheduled job executed!");
//
//            // Handle job execution result if needed
//        } catch (Exception e) {
//            // Handle exception
//        }
//    }
//}

