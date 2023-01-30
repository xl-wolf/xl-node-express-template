const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const excel2json = require('../../businessModule/excel2json')
excel2json()
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// 登出
router.post("/excel/upload", (req, res) => {
  res.json({ status: "200", msg: "登出成功" });
});

module.exports = router;
