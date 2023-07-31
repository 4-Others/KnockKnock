#!/bin/bash

# 빌드 파일의 이름이 콘텐츠와 다르다면 다음 줄의 .jar 파일 이름을 수정하시기 바랍니다.
BUILD_JAR=$(ls /home/ssm-user/KnockKnock/back/KnockKnock/build/libs/KnockKnock-0.0.1-SNAPSHOT.jar)
JAR_NAME=$(basename $BUILD_JAR)

LOG_FILE="/home/ssm-user/KnockKnock/back/KnockKnock/scripts/deploy.log"

echo "> 현재 시간: $(date)" >> "$LOG_FILE"
echo "> build 파일명: $JAR_NAME" >> "$LOG_FILE"

echo "> build 파일 복사" >> "$LOG_FILE"
DEPLOY_PATH="/home/ssm-user/KnockKnock/"
cp $BUILD_JAR $DEPLOY_PATH

echo "> 현재 실행중인 애플리케이션 컨테이너 확인" >> "$LOG_FILE"
CONTAINER_ID=$(docker ps -q -f name=epic_mccarthy)  # Docker 컨테이너 이름을 여기에 입력하세요.

if [ -z "$CONTAINER_ID" ]
then
  echo "> 현재 실행중인 애플리케이션 컨테이너가 없으므로 종료하지 않습니다." >> "$LOG_FILE"
else
  echo "> 컨테이너를 중지시킵니다." >> "$LOG_FILE"
  docker stop "$CONTAINER_ID"
fi

echo "> DEPLOY_JAR 배포" >> "$LOG_FILE"
docker run -d -p 8080:8080 --env-file app.env knockknock -v $DEPLOY_PATH$JAR_NAME:/app.jar knockknock java -jar /app.jar
