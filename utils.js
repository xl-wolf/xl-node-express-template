
const fs = require('fs')
const path = require('path')

// 创建文件夹
const mkdirsRecursive = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsRecursive(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

// 保存文件到本地的方法
const writeFileTolocalSync = (jsondata, filename) => {
  const jsonContent = JSON.stringify(jsondata);
  try {
    fs.writeFileSync(filename, jsonContent, 'utf-8')
    console.log(`保存${filename}成功！！`);
  } catch (err) {
    if (err) {
      console.log("output.json失败了");
      return false
    }
  }
}


module.exports = {
  mkdirsRecursive,
  writeFileTolocalSync
}