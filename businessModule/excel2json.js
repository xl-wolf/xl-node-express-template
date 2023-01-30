const xlsx = require('xlsx');
const fs = require('fs')
const path = require('path')
const { mkdirsRecursive, writeFileTolocalSync } = require('../utils')
const mergeData = require('./mergeData')

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

      const basename = path.basename(dest).slice(0, path.basename(dest).lastIndexOf("."))
      mkdirsRecursive(`./tempJson/${dir}`)
      const destPath = `./tempJson/${dir}/${basename}.json`
      writeFileTolocalSync(data, destPath)
    })
  })
  mergeData()
}
excel2json()
module.exports = excel2json