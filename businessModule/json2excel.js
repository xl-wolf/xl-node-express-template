const fs = require('fs')
const json2xls = require('json2xls');
const { mkdirsRecursive } = require('../utils')
const json2excel = (sourcefile, destFile) => {
    fs.readFile(sourcefile, 'utf8', (err, data) => {
        if (err) throw err;
        const json = JSON.parse(data);
        const xls = json2xls(json);
        fs.writeFileSync(destFile, xls, 'binary');
    })
}
mkdirsRecursive('./finalExcel')
json2excel('./mergedJson/最终要获得的数据.json', './finalExcel/最终要获得的数据.xlsx')

module.exports = json2excel
