#!/bin/bash

# 이전 배포에서 생성된 파일들을 삭제합니다.
rm -rf /home/ssm-user/KnockKnock/back/KnockKnock/build

# 이전 배포에서 생성된 도커 컨테이너를 이미지 이름으로 찾아 중지하고 삭제합니다.
DOCKER_IMAGE_NAME="knockknock"  # 여기에 해당하는 도커 이미지 이름을 입력하세요.

# 도커 컨테이너 중지
docker stop $(docker ps -q -f ancestor=$DOCKER_IMAGE_NAME)

# 도커 컨테이너 삭제
docker rm $(docker ps -aq -f ancestor=$DOCKER_IMAGE_NAME)
