const express = require('express');
//const bodyParser = require('body-parser');

//json 데이터 파싱을 위한 body-parser
const jsonParser = express.json();

const app = express();  //express의 인스턴스
const port = 3000;  //server port number

//app.use(express.static('public'));  // public 폴더에 있는 모든 정적 파일을 URL러 제공할 수 있게 된다.
app.use('/server',express.static('public'));  // public 폴더에 있는 모든 정적 파일을 URL러 제공할 수 있게 된다.


//app.listen() 함수를 사용해서 서버를 실행한다.
//클라이언트는 'host:port'로 노드 서버에 요청을 보낼 수 있다.
app.listen(port,() => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`);
})


/*
라우트 1
HTTP 요청 메소드: get
PATH(서버에서의 경로): /
HANDLER: res.send('HEllo World!');
*/
//클라이언트에서 HTTP 요청 메소드 중 GET을 이용해서 'host:port'로 요청을 보내면 실행되는 라우트이다.
app.get('/server',(req, res) => {

    // res.send('Hello World!');
    res.sendFile( __dirname + '/public/about.html');
})


