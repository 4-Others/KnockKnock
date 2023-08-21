#!/bin/bash

# 이전 배포에서 생성된 파일들을 삭제합니다.
if [ -d "/home/ssm-user/KnockKnock/back/KnockKnock/build" ]; then
    rm -rf /home/ubuntu/action/back/KnockKnock/build
fi
# 이전 배포에서 생성된 도커 컨테이너를 이미지 이름으로 찾아 중지하고 삭제합니다.
CONTAINER_NAME="knockknockcon"  # 여기에 해당하는 도커 컨테이너이름을 입력하세요.
IMAGE_NAME="knockknock"
# 도커 컨테이너 중지
if docker ps -a | grep -q $CONTAINER_NAME; then
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
    echo "Container $CONTAINER_NAME removed"
else
    echo "Container $CONTAINER_NAME not found, skipping removal"
fi
## 도커 이미지 삭제
#if docker images | grep -q $IMAGE_NAME; then
#    docker rmi $IMAGE_NAME
#    echo "Image $IMAGE_NAME removed"
#else
#    echo "Image $IMAGE_NAME not found, skipping removal"
#fi

