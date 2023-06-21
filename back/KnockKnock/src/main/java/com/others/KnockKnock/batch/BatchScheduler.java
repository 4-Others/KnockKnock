//package com.others.KnockKnock.batch;
//
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.JobParameters;
//import org.springframework.batch.core.JobParametersBuilder;
//import org.springframework.batch.core.JobParametersInvalidException;
//import org.springframework.batch.core.launch.JobLauncher;
//import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
//import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
//import org.springframework.batch.core.repository.JobRestartException;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//@Component
//public class BatchScheduler {
//    private final JobLauncher jobLauncher;
//    private final Job inactiveAccountsJob;
//
//    public BatchScheduler(JobLauncher jobLauncher, Job inactiveAccountsJob) {
//        this.jobLauncher = jobLauncher;
//        this.inactiveAccountsJob = inactiveAccountsJob;
//    }
//
//    @Scheduled(cron = "0 0 0 * * ?") // 매일 자정에 실행
//    public void runInactiveAccountsJob() throws JobParametersInvalidException, JobExecutionAlreadyRunningException, JobRestartException, JobInstanceAlreadyCompleteException, JobInstanceAlreadyCompleteException, JobRestartException {
//        JobParameters jobParameters = new JobParametersBuilder()
//                .addLong("time", System.currentTimeMillis())
//                .toJobParameters();
//
//        jobLauncher.run(inactiveAccountsJob, jobParameters);
//    }
//}
