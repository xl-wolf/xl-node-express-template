const mysql = require("mysql");
const serverUrl = require("./serverUrl");
const user = require("./user");
const connectionPool = mysql.createPool({
  host: serverUrl.host, //数据库所在服务器地址
  user: user.user, //用户名
  password: user.password, //密码
  database: "test", //数据库名
  port: 3306, //数据库端口
});

module.exports = connectionPool;
