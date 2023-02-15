module.exports = {
    userList: `select * from users`,
    //userInsert: `insert into users (id, name, age, password) values(?, ?, ?, password(?))`
    userInsert: `insert into users set ?`
}