const express = require("express");
const path = require('path');
const static = require('serve-static');
require('dotenv').config({path: 'mysql/.env'}); //mysql 폴더에 있는 .env 파일울 찾아서 환경변수를 설정한다.

const mysql = require("./mysql");   //mysql 폴더의 index.js

const app = express();
//app.use('/api/insert',express.static('public'));  // public 폴더에 있는 모든 정적 파일을 URL로 제공할 수 있게 된다.
app.use('/api/insert', static(path.join(__dirname, 'public')))


app.use(express.json({
    limit: '50mb'   //최대 50메가
}));//클라이언트 요청 body를 json으로 파싱 처리해준다.

app.listen(3000, () => {
    //3000번 포트로 서버 실행
    console.log("Server started. port 3000.");
});

//고객정보 조회 라우터
app.get("/api/users", async (req, res) => {

    //localhost:3000/users 접속 시 실행
    const users = await mysql.query('userList');   //sql.js 파일에 작성된 userList 쿼리 실행
    console.log(users);
    res.send(users);
});

//고객 정보 추가 라우터
app.post('/api/insert', async (req, res) => {

    const result = await mysql.query('userInsert', req.body.parm);
    //res.send(result);
    res.sendFile( __dirname + '/public/adduser.html');
})

