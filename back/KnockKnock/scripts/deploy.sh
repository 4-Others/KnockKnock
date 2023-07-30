#!/bin/bash
# 빌드 파일의 이름이 콘텐츠와 다르다면 다음 줄의 .jar 파일 이름을 수정하시기 바랍니다.
BUILD_JAR=$(ls /home/ssm-user/KnockKnock/back/KnockKnock/build/libs/*.jar)
JAR_NAME=$(basename $BUILD_JAR)

echo "> 현재 시간: $(date)" >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log
echo "> build 파일명: $JAR_NAME" >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log

echo "> build 파일 복사" >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log
DEPLOY_PATH="/home/ssm-user/KnockKnock/"
cp $BUILD_JAR $DEPLOY_PATH

echo "> 현재 실행중인 애플리케이션 pid 확인" >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log
CURRENT_PID=$(pgrep -f $JAR_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 현재 구동중인 애플리케이션이 없으므로 종료하지 않습니다." >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log
else
  echo "> kill -9 $CURRENT_PID" >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log
  sudo kill -9 $CURRENT_PID
  sleep 5
fi

DEPLOY_JAR="$DEPLOY_PATH$JAR_NAME"
echo "> DEPLOY_JAR 배포" >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log
sudo nohup java -jar $DEPLOY_JAR >> /home/ssm-user/KnockKnock/back/KnockKnock/deploy.log 2>/home/ssm-user/KnockKnock/back/KnockKnock/deploy_err.log &
