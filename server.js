const express = require('express');
const path = require('path');
const app = express();

app.listen(8080, function () {
  console.log('listening on 8080')
}); 

// 아래 세줄 추가해놔야 ajax 잘 됨
// 이거 쓰려면 서버프로젝트 터미널에서 npm install cors 설치해야합니다. 
// express.json() 은 유저가 보낸 array/object 데이터를 출력해보기 위해 필요하고
// cors는 다른 도메인주소끼리 ajax 요청 주고받을 때 필요합니다. 
app.use(express.json());
var cors = require('cors');
app.use(cors());

// react-app/build/index.html 폴더 안에 있는 static파일들을 가져다 쓰겠다는 의미
app.use(express.static(path.join(__dirname, 'react-app/build')));

// 메인 페이지에 접속했을 때 'react-app/build/index.html'를 보내주세요
app.get('/', function(요청, 응답) {
    응답.sendFile(path.join(__dirname, 'react-app/build/index.html'));
});

// DB 데이터 리액트에서 보여주는 방법, 리액트 <- 서버 <- DB
// html을 서버가 만들면 ssr, html을 리액트가 만들면 csr
// 리액트 파일에서 상품데이터 필요하면 /product로 GET요청하면 끝
app.get('/product', function(요청, 응답) {
    응답.json({name: 'black shoes'});
});

// 리액트 라우터 사용하는 경우 최하단에 추가해놓는게 좋음
app.get('*', function(요청, 응답) {
    응답.sendFile(path.join(__dirname, 'react-app/build/index.html'));
});