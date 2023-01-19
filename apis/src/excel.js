const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs")
const xlsx = require('node-xlsx');
const multer = require('multer')
const { mkdir } = require('../../utils/index');
const { exec } = require('child_process');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const sourceDataPath = './sourceData'
mkdir(sourceDataPath)
const upload = multer({ dest: sourceDataPath })

// 上传excel
// upload.single('file'),
router.post("/excel/upload", (req, res) => {
  res.status(200).end("ok")
  // const filename = Buffer.from(req.file.originalname, "latin1").toString("utf8")
  // const destPath = sourceDataPath + '/' + filename
  // fs.renameSync(sourceDataPath + '/' + req.file.filename, destPath)
  // const xlsxlist = xlsx.parse(destPath); // 需要 转换的excel文件
  // console.log(xlsxlist[0])
  // xlsxlist[0].data.forEach(row=>{
  //   console.log(row)
  // })
  exec('python ./exceltojson.py && node ./handledata.js && python ./jsontoexcel.py', function (err, stdout, stderr) {
    if (err) {
      console.log('error:' + stderr);
    } else {
      console.log('args stdout:' + stdout);
    }
  })
});
// 下载excel   todo
// router.get('/excel/download',(req,res)=>{
//   res.download(sourceDataPath + '/' + '源数据2')
//   res.status(200).end("ok")
// })

module.exports = router;
