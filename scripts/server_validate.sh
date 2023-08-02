#!/bin/bash

# Docker 서비스가 응답하는지 확인합니다.
# 여기서 ACTIVE_PROFILE과 ACTIVE_PORT는 여러분의 프로젝트에 맞게 수정해야 합니다.
ROOT_PATH="/home/ssm-user/KnockKnock/back/KnockKnock"  # 애플리케이션 루트 경로 설정
ACTIVE_PROFILE=$(cat ${ROOT_PATH}/app.env | grep "^ACTIVE_PROFILE" | cut -d "=" -f2)  # app.env 파일에서 ACTIVE_PROFILE 읽어오기
ACTIVE_PORT=$(cat ${ROOT_PATH}/app.env | grep "^ACTIVE_PORT" | cut -d "=" -f2)  # app.env 파일에서 ACTIVE_PORT 읽어오기

# Active profile과 port가 설정되었는지 확인
if [ -z "$ACTIVE_PROFILE" ] || [ -z "$ACTIVE_PORT" ]; then
  echo "ERROR: Active profile or port is not set in app.env file."
  exit 1
fi

# Active profile과 port 출력
echo "Active Profile: $ACTIVE_PROFILE"
echo "Active Port: $ACTIVE_PORT"

for cnt in {1..10}
do
    echo "Docker : $ACTIVE_PROFILE 서비스 응답 대기중 ... (${cnt}/10)"

    UP=$(curl -s http://localhost:${ACTIVE_PORT}/api/v1/health | grep "UP")

    if [ -z "${UP}" ]; then
        sleep 30
        continue
    else
        break
    fi
done

# Docker 서비스가 정상적으로 응답하지 않으면 오류로 처리합니다.
if [ $cnt -eq 10 ]; then
    echo "서버가 정상적으로 구동되지 않았습니다."
    exit 1
fi

echo "Docker : Active($ACTIVE_PROFILE:$ACTIVE_PORT) 배포가 정상적으로 완료되었습니다."
