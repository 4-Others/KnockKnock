#!/bin/bash

# 배포된 파일들에 대해 실행 권한을 추가합니다.
chmod +x /home/ubuntu/action/back/KnockKnock/build/**
LOG_FILE="/home/ubuntu/action/back/KnockKnock/scripts/deploy.log"
echo "> 초기화 작업이 완료되었습니다." >> "$LOG_FILE"