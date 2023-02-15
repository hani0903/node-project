module.exports = {
    userList: `select * from users`,
    //userInsert: `insert into users (id, name, age, password) values(?, ?, ?, password(?))`
    userInsert: `insert into users set ?`,
    userLogIn: `select id, name from users where id=? and password=?`
}