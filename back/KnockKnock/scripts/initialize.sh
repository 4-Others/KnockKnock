#!/bin/bash

# 배포된 파일들에 대해 실행 권한을 추가합니다.
chmod +x /home/ubuntu/action/**

IMAGE_NAME="kki"
# 새로운 이미지를 빌드합니다.
docker build -t $IMAGE_NAME /home/ubuntu/action