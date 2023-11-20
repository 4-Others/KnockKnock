# KnockKnock

| AppDev | youngjae7133@gmail.com, modac0302@gmail.com |
| --- | --- |
| ServerDev | adsds126@gmail.com |

<br/>

<div align="center">
  <img width="100%" src="https://raw.githubusercontent.com/4-Others/4-Others-readmeImg/main/mainImage.png" alt="roobits">
</div>

<br/>

- **`팀 명` :**  💪🏼 4Others 👨‍👦‍👦
- **`프로젝트 명` :** KnockKnock
- **`프로젝트 기간` :** 2023.05 - 2023.11
- **`한줄 소개` :** KnockKnock !  일상 속 크고 작은 일정들이 반가운 손님의 노크 소리처럼 우리에게 다가와
기분 좋은 하루를 보낼 수 있게 도와주는 일정 관리 모바일 어플리케이션
- **`팀원` :** 김준희(팀장), 김영재, 김태형, 현지원
- **`사용자 요구사항 정의서`:**
   <img width="100%" src="https://raw.githubusercontent.com/4-Others/4-Others-readmeImg/main/스크린샷 2023-11-20 오후 2.52.38.png" alt="roobits">
- **`개발자 테스트 체크리스트`:**
   <img width="100%" src="https://raw.githubusercontent.com/4-Others/4-Others-readmeImg/main/스크린샷 2023-11-20 오후 3.48.30.png" alt="roobits">

<br/>

## 💼 Team

| **김준희 (FE)** | **김영재 (FE)** | **김태형 (BE)** | **현지원 (BE)** |
| -------------- | -------------- | -------------- | -------------- |
| · App design & Style Guide 제작<br/> · App UI&UX 구현<br/> ·Multy Dots, 다중 일정 선택을 제공하는 커스텀 캘린더 구현<br/> ·회원가입 프로세스 구축 및 기능 구현, 에러 핸들링 시각화<br/> ·Google / Kakao 소셜 로그인 및 일반로그인 구현<br/> ·회원데이터 / 일정데이터,전역상태 관리 및 CRUD 구현<br/> · 기간 및 일정 선택 일정 데이터 검색 기능 구현<br/> | ·영재님 작업 내용<br/> | · Local User, Oauth2 User api 개발<br/> · AWS EC2에 서버 배포<br/>· 도메인 구매 및 연결<br/>· HTTPS 적용(ACM, Route 53)<br/> · GitHub Actions를 활용한 CI/CD 구현<br/> · Docker 이미지 빌드 및 컨테이너 생성<br/> · RDS를 이용한 MySQL 데이터베이스 관리<br/> | ·지원님 작업 내용<br/> |

| name | Github                                     |
|:----:|:-------------------------------------------|
| 김준희  | [@modac0](https://github.com/modac0)       |
| 김영재  | [@BangBang-e](https://github.com/BangBang-e)|
| 김태형  | [@adsds126](https://github.com/adsds126)   |
| 현지원  | [@gr8g1](https://github.com/gr8g1)         |

<br/>

### <span style=""> ⚙️ **Stack** </span>

<br/>

## 🌟 Screen

| 로그인 / 회원가입 스크린 | 스케줄 등록 스크린 |
| -------------- | -------------- |
| <img width="100%" src="https://github.com/4-Others/4-Others-readmeImg/blob/main/screenshot01.png"/> | <img width="100%" src="https://github.com/4-Others/4-Others-readmeImg/blob/main/screenshot02.png"/> |
| 보드 리스트 스크린 | 캘린더 스크린 |
| <img width="100%" src="https://github.com/4-Others/4-Others-readmeImg/blob/main/screenshot03.png"/> | <img width="100%" src="https://github.com/4-Others/4-Others-readmeImg/blob/main/screenshot04.png"/> |
| 알림 스크린 | 검색 스크린 |
| <img width="100%" src="https://github.com/4-Others/4-Others-readmeImg/blob/main/screenshot05.png"/> | <img width="100%" src="https://github.com/4-Others/4-Others-readmeImg/blob/main/screenshot06.png"/> |

<br/>

## 👩🏻‍💻 FE flow

**화면정의서**
작성중

**Flow**
작성중





<br/>

## 🔖 DB Diagram

<img width="100%" src="https://github.com/4-Others/4-Others-readmeImg/blob/main/erd.png"/>

##### 💡Postman API 문서

[User apis](https://documenter.getpostman.com/view/24687418/2s9Y5eNzLG) <br/>
[Schedule, tags, notification apis](https://documenter.getpostman.com/view/5042575/2s946k7BFe#4d553411-90b8-4a36-b0f3-be4d11692bb3)

<br/>

## 📎 Git

### 🌲 Branch

`main` : 릴리즈 환경 브랜치입니다.  
`dev` :  디버그 환경 브랜치입니다.  
`fe/개발명` : 프론트 기능 개발 브랜치 입니다. ex) fe/Login
`be/개발명` : 백엔드 기능 개발 브랜치 입니다. ex) be/Login

<br/>

```text
📌 Pull Request Merge 담당 📌
❗️주의 : 해당 브랜치별로 담당 인원분들은 전부 모여 코드리뷰 및 동의 후에 
Merge를 진행해주시기 바랍니다

main <- dev : 김준희, 김영재, 김태형, 현지원

dev <- feat : 김준희, 김영재, 김태형, 현지원
```

<br/>

### ✉️ Commit  Message

| Message | 설명 [ 깃모지를 활용한 커밋 메세지 작성 ]            |
|:-------:|:-------------------------------------|
|   🎨    | Improve Structure/Format of the code |
|   🔨    | Add or Update Development scripts    |
|   🚨    | Fix compiler/Linter warnings         |
|   📝    | Add or Update Documentation          |
|   🔥    | Remove code or files                 |
|   🎉    | Begin a project                      |
