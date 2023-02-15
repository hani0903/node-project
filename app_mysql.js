const express = require("express");
const path = require('path');
const static = require('serve-static');
require('dotenv').config({path: 'mysql/.env'}); //mysql 폴더에 있는 .env 파일울 찾아서 환경변수를 설정한다.

const mysql = require("./mysql");   //mysql 폴더의 index.js

const app = express();
//app.use('/api/insert',express.static('public'));  // public 폴더에 있는 모든 정적 파일을 URL로 제공할 수 있게 된다.
//app.use('/api/insert', static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended:true})); // url : Uniform Resource 
app.use(express.json());
// app.use(express.json({
//     limit: '50mb'   //최대 50메가
// }));//클라이언트 요청 body를 json으로 파싱 처리해준다.

app.listen(3000, () => {
    //3000번 포트로 서버 실행
    console.log("Server started. port 3000.");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/adduser.html');
})

//고객정보 조회 라우터
app.get("/api/users", async (req, res) => {

    console.log('/api/users 호출됨 ' + req)

    //localhost:3000/users 접속 시 실행
    const users = await mysql.query('userList');   //sql.js 파일에 작성된 userList 쿼리 실행
    console.log(users);
    res.send(users);
});

//고객 정보 추가 라우터
app.post('/api/insert', async (req, res) => {

    console.log('/api/insert executed...');
    console.log(req.body.id);
    console.log(req.body.name);
    console.log(req.body.age);
    console.log(req.body.password);

    const param = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        password: req.body.password
    };

    console.log(param);

    try {
        const result = await mysql.query('userInsert', param);
        console.log('result is : ', result);
        // .catch((err) => {
        //     console.log('err occurred on /api/insert, error : ', err);
        // });
    } catch (error) {
        console.log('error.');
    }


    //res.send(result);
    res.sendFile( __dirname + '/public/login.html');
})


//로그인 라우터
app.post('/api/login', async (req, res) => {

    const paramId = req.body.id;
    const paramPassword = req.body.password;

    console.log('/api/login executed...');
    console.log(req.body.id);
    console.log(req.body.password);

    const logIn = await mysql.query('userLogIn',
        [paramId, paramPassword]    
    );   //sql.js 파일에 작성된 userList 쿼리 실행

    console.log(logIn.length>0);

    if(logIn.length>0){
        res.send("로그인에 성공하였습니다.")
    }    
    else{
        res.send("로그인에 실패하였습니다.")
    }

    //res.send(logIn);

})