const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs")
const xlsx = require('node-xlsx');
const { mkdir } = require('../../utils/index')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const sourceDataPath = './sourceData'

// 上传excel
router.post("/excel/upload", (req, res) => {
  // 创建sourceDatasourceData文件夹
  mkdir(sourceDataPath)
  const chunks = [];
  req.on("data", (chunk) => {
    console.log('ondata',chunk)
    chunks.push(chunk)})
  req.on("end", () => {
    console.log('onend')
    const buffer = Buffer.concat(chunks);
    console.log(buffer.toJSON().data)
    fs.writeFile(`${sourceDataPath}/a.xlsx`, buffer, (err) => {
      if (!err) {
        res.status(200).end("ok")
      }
    })
  })

});

module.exports = router;
