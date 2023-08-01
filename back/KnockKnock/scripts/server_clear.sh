#!/bin/bash

# 이전 배포에서 생성된 파일들을 삭제합니다.
rm -rf /home/ssm-user/KnockKnock/back/KnockKnock/build

# 이전 배포에서 생성된 도커 컨테이너를 중지하고 삭제합니다.
docker stop $(docker ps -q -f name=epic_mccarthy)
docker rm $(docker ps -aq -f name=epic_mccarthy)
