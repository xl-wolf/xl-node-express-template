const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const DB = require("../../dbConnection/dbConnection");
const utils = require("../../utils/index");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// 注册
router.post("/user/register", (req, res) => {
  // console.log(req.body)
  let { uname, upwd } = req.body;
  if (!uname || !upwd) {
    res.json({ status: "500", msg: "用户名和密码不能为空" });
  }
  if (utils.checkPhoneRegExp(uname)) {
    res.json({ status: "400", msg: "手机格式不正确" });
  }
  let sql = `SELECT * FROM user_info WHERE uname = '${uname}' AND upwd = '${upwd}'`;
  DB.sqlExcutor(sql)
    .then((resData) => {
      let { fields, results } = resData;
      if (results.length > 0) {
        res.json({ status: "500", msg: "用户名已存在" });
      } else {
        let sql = `INSERT INTO user_info (uid,uname, upwd) VALUES (null, ${uname},${upwd})`;
        DB.sqlExcutor(sql).then((resData) => {
          let { fields, results } = resData;
          if (results.affectedRows > 0) {
            res.json({ status: "200", msg: "注册成功" });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// 登录
router.post("/user/login", (req, res) => {
  let { uname, upwd } = req.body;
  let sql = `SELECT * FROM user_info WHERE uname = '${uname}' AND upwd = '${upwd}'`;
  DB.sqlExcutor(sql)
    .then((resData) => {
      console.log(resData);
      let { fields, results } = resData;
      if (results.length > 0) {
        res.json({ status: "200", msg: "登录成功" });
      } else {
        res.json({ status: "500", msg: "用户名或密码错误" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
