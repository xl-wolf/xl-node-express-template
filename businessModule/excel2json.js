const xlsx = require('xlsx');
const fs = require('fs')
const path = require('path')
const { mkdirsRecursive, writeFileTolocalSync } = require('../utils')
const mergeData = require('./mergeData')
const json2xls = require('json2xls');
const join = (file) => path.join(__dirname, file);

// 声明上层变量用于保存源数据等文件夹下的数据
const finalJsondata = []
const yuanshujudata = []
const fukuandata = []
const shoukuandata = []
const shouhoucangkudata = []
const shouhouqudaodata = []

const excel2json = () => {
  const dirs = fs.readdirSync('./sourceData')
  dirs.forEach(dir => {
    const files = fs.readdirSync(`./sourceData/${dir}`)
    files.forEach(file => {
      const dest = `./sourceData/${dir}/${file}`
      const workbook = xlsx.readFile(dest)
      const sheetNames = workbook.SheetNames
      const sheet = workbook.Sheets[sheetNames[0]]; //通过表名得到表对象
      const data = xlsx.utils.sheet_to_json(sheet); //通过工具将表对象的数据读出来并转成json

      if (dir === '源数据') {
        yuanshujudata.push(...data)
      } else if (dir === '付款单') {
        fukuandata.push(...data)
      } else if (dir === '收款单') {
        shoukuandata.push(...data)
      } else if (dir === '售后仓库退款单') {
        shouhoucangkudata.push(...data)
      } else if (dir === '售后渠道退款单') {
        shouhouqudaodata.push(...data)
      }

    })
  })

  yuanshujudata.sort((a, b) => a['订单编号'].slice(1) - b['订单编号'].slice(1))
  yuanshujudata.forEach(yuanshuju=>{
    yuanshuju['订单编号']
  })

  writeFileTolocalSync(yuanshujudata, './yuan.json')
  // writeFileTolocalSync(fukuandata, './fukuandata.json')
  // writeFileTolocalSync(shoukuandata, 'shoukuandata.json')
  // writeFileTolocalSync(shouhoucangkudata, 'shouhoucangkudata.json')
  // writeFileTolocalSync(shouhouqudaodata, 'shouhouqudaodata.json')

  mkdirsRecursive(join('../finalExcel'))
  const xls = json2xls(yuanshujudata);
  fs.writeFileSync(join(`../finalExcel/最终要获得的数据.xlsx`), xls, 'binary');
  console.log('最终要获得的数据.xlsx成功！！')
}

module.exports = excel2json
