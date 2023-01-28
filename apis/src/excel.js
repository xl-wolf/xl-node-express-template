const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const xlsx = require('xlsx');
const fs = require('fs')
const path = require('path')
fs.readdir('./sourceData', (err, dirs) => {
  // console.log(dirs)
  dirs.forEach(dir => {
    if (dir === '源数据') {
      const files = fs.readdirSync('./sourceData/' + dir)
      console.log(files)
      files.forEach(file => {
        const dest = `./sourceData/${dir}/${file}`
        const workbook = xlsx.readFile(dest)
        const sheetNames = workbook.SheetNames
        const sheet = workbook.Sheets[sheetNames[0]]; //通过表名得到表对象
        const data = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json
        console.log(sheet,data)
      })
    }
  })
})
// const workbook = xlsx.readFile('./sourceData/付款单/付款单1.xlsx'); //workbook就是xls文档对象
// const sheetNames = workbook.SheetNames; //获取表明
// const sheet = workbook.Sheets[sheetNames[0]]; //通过表名得到表对象
// var data = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json
// console.log(data)
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

// 登出
router.post("/excel/upload", (req, res) => {
  res.json({ status: "200", msg: "登出成功" });
});

module.exports = router;
