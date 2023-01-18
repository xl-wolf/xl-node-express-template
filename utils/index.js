const fs = require('fs'); //文件模块
const path = require('path'); //系统路径模块
// 手机正则校验
const checkPhoneRegExp = (phoneNumber) => {
  const phoneRegExp = /^1[3456789]\d{9}$/;
  return !phoneRegExp.test(phoneNumber);
};

const mkdir = (dir) => !fs.existsSync(dir) && fs.mkdirSync(dir)
const join = (file) => path.join(__dirname, file);
// 保存json文件到本地的方法
const writeFileTolocal = (jsondata, filename) => {
  const jsonContent = JSON.stringify(jsondata);
  const destfile = join(`${filename}.json`)
  fs.writeFile(destfile, jsonContent, 'utf-8', (err) => {
    if (err) {
      console.log("output.json失败了");
      return
    }
    console.log(`保存${filename}.json成功！！`);
  });
}

module.exports = {
  checkPhoneRegExp,
  mkdir,
  writeFileTolocal
}
