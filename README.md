<img src="/readmeAssets/ProjectLogo.png" width="40%" height="auto" alt="Project Logo"></img>

# Battle Underground

## Table of Contents

1. [ Introduction ](#introduction)
2. [ Prerequisites ](#prerequisites)
3. [ Installation ](#installation)
4. [ Features ](#features)
5. [ Skills ](#skills)
6. [ Challenges ](#challenges)
7. [ Project Control ](#projectcontrol)
8. [ Things to Do ](#thingstodo)

<a name='introduction'></a>
## Introduction
같은 열차에 탄 사람과 랜덤으로 매칭되어 실시간으로 채팅과 미니게임을 즐길 수 았는 안드로이드 전용 어플리케이션입니다.

<img src="/readmeAssets/projectDemo1.gif" width="30%" height="auto" alt="Project Demo 1"></img>
<img src="/readmeAssets/projectDemo2.gif" width="30%" height="auto" alt="Project Demo 2"></img>

<a name='prerequisites'></a>
## Prerequisites
로컬환경에서 실행하기 위해서 아래 절차가 필요합니다.

### Client
- 루트 디렉토리에 있는 environment.js파일을 수정해주세요. ( <your_~>를 지우고 발급받은 정보들을 입력해주세요.)
- 모바일 기기 인터넷 연결을 로컬 환경과 동일한 ip 주소로 연결해주신 후, QR코드로 실행하실 수 있습니다.
```

{
  GEO_API_KEY: '<your_api_key>',

  SEOUL_DATA_API: 'http://swopenAPI.seoul.go.kr/api/subway/<your_subway_key>/json/nearBy/0/5/',
  SEOUL_DATA_REAL_TIME_API:'http://swopenAPI.seoul.go.kr/api/subway/<your_subway_key>/json/realtimeStationArrival/0/5/',
  
  HOST_URL: 'http://<your_ip_address>:4000'
}

```

- [Google GEO](https://console.cloud.google.com/?hl=ko)
  1. Google 로그인
  2. API 및 서비스 - 대시보드 - API 및 서비스 사용 설정
  3. "Geocoding API" 선택 - 사용 설정
  4. API 및 서비스 - 사용자 인증 정보 - 사용자 인증 정보 만들기 - API키 (<your_api_key>에 해당)

- [서울 열린데이터광장 인증키 신청](http://data.seoul.go.kr/)
  1. 서울 열린데이터광장 로그인
  2. 공공데이터 - 데이터셋 - 서울시 지하철 실시간 도착정보 - 인증키 신청(지하철) (<your_subway_key>에 해당)

### Server
- .env 파일을 루트 디렉토리에 생성하고, 환경변수를 설정해주세요. ( <your_~>를 지우고 발급받은 정보들을 입력해주세요.)
```

PORT=4000

MONGO_DB_URL=<your_connection_string>

```

- [MongoDB](https://www.mongodb.com)
  1. MongoDB Atlas 로그인 및 접속
  2. Connect your application - your connection string
 

<a name='installation'></a>
## Installation

### Client
```

$ git clone https://github.com/hyozzang2/battleUnderground-client.git
$ cd battleUnderground-client

$ npm install
$ expo start

```

### Server
```

$ git clone https://github.com/hyozzang2/battleUnderground-server.git
$ cd battleUnderground-server

$ npm install
$ npm start

```
<a name='features'></a>
## Features
- 실시간 위치 기반 근처 지하철역 리스트
- 해당 지하철역 실시간 도착 열차 리스트
- 랜덤 유저와 실시간 미니 게임
- 랜덤 유저와 실시간 채팅
- 탑 랭킹 보드
- 환승 시 실시간 위치 기반 열차 재 선택
- 게임 종료 후 다른 랜덤 유저와 매칭 및 재 시작
- 닉네임 수정 
- 스코어 누적
- Google Geocoding API 좌표 주소 변환

<a name='skills'></a>
## Skills

### Client
- React-Native
- Socket.io
- Expo
- Redux
- Redux Middleware

### Server
- Typescript
- Socket.io
- Node.js
- Express
- MongoDB
- Mongoose

<a name='challenges'></a>
## Challenges
- Redux Middleware로 Socket관리<br/>
Socket 관련 로직을 모두 Redux Middleware내부에서 처리하여 유지와 보수가 용이하도록 하였습니다.<br/>
Custom Middleware를 처음 만들어보았기 때문에 작동 순서가 낯설었습니다.<br/>
내부에서 store에 dispatch 했을 때나, Reducer에서 같은 action type이 있을  때 등의 헷갈리는 경우가 있었습니다.<br/>
먼저 첫번 째의 경우 Store에 dispatch된 직후 middleware를 한 번 더 돌기 때문에 불필요한 event trigger가 잦은 문제를 발견했습니다.<br/>
Socket.off를 사용하여 해당 event를 종료시키는 것으로 문제를 해결했습니다.<br/>
두번 째의 경우 Middleware가 Reducer보다 먼저 처리되기 때문에 동일한 action type이 있다면 Reducer 내부에서는 실행되지 않는다는 것을 알게되었습니다.

- Shallow Copy로 인한 랜더링 이슈<br/>
미니 게임을 하는 중 State에 배열로 유저가 선택한 박스를 관리했는데, 유저가 선택했음에도 화면에 반영되지않는 문제를 발견했습니다.<br/>
State에는 데이터가 정상적으로 업데이트되어 있었기 때문에, 원인을 찾는 것이 어려웠습니다.<br/>
결국 React의 랜더링 최적화를 위한 얕은 복사가 원인이라는 것을 알게 되었습니다.<br/>
해당 배열을 State Object에 중첩하여 넣지 않고 데이터 Normalization을 통해 랜더링 이슈를 해결할 수 있었습니다.<br/>
Shallow Copy로 인한 문제를 직접 경험해보니 State뿐만 아니라 데이터 관리에 대한 중요성을 깨닫는 계기가 되었습니다.

- Typescript config와 적용<br/>
Typescript를 처음 써보았는데, 첫 시작인 tsconfig.json파일을 만드는 것부터 어려웠습니다.<br/>
Typescript & Express Boilerplate를 사용할 수 있었지만, 직접 설정해보고 싶었기 때문에 자료를 찾아가며 tsconfig.json파일을 작성했습니다.<br/>
생각보다 nodemon과 같이 따로 설정해주어야하는 Options도 있었기에 오랜 시간을 들여 작성했었습니다.<br/>
또한 Mongoose관련 로직을 쓸 때의 타입 지정이나, 모든 데이터를 interface로 관리하는 과정에서 어려움을 겪었습니다.<br/>
그러나 개발하는 내내 Typescript를 적용하는 것이 무척 좋았습니다.<br/>
스스로 작성한 코드가 불안할 때가 많았는데, Typescript를 적용하니 에러가 현저히 줄어듦과 동시에 안정적으로 개발되었다는 만족감을 주었습니다.<br/>
비록 기초적인 수준으로 사용하였지만, Typescript의 사용 이유에 대해 깊이 깨닫고 호감도를 높일 수 있었던 좋은 계기가 되었습니다.

<a name='projectcontrol'></a>
## Project Control
- Git, GitHub을 사용한 Version Control
- Notion을 사용한 Task Control

<a name='thingstodo'></a>
## Things to do
- 게임 종료 시 같은 유저와 재 시작
- 실시간 위치와 지하철역 위치 비교하여 검증
- Unit Test
