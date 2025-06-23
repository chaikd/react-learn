const { readdirSync, writeFileSync, readFileSync, existsSync, unlinkSync } = require('fs');
const { resolve } = require('path');

const dirPath = resolve(__dirname, '../server');
let buildPath = resolve(dirPath, './build.json')
if (existsSync(buildPath)) {
  unlinkSync(buildPath)
}
const files = readdirSync(dirPath);
write()
function write() {
  let targetObj = {}
  files.filter(v => v.endsWith('.json')).forEach(filename => {
    let filePath = resolve(dirPath, filename)
    let obj = JSON.parse(readFileSync(filePath, 'utf-8'))
    targetObj = Object.assign(obj, targetObj)
  })
  let buf = Buffer.from(JSON.stringify(targetObj), 'utf-8')
  writeFileSync(buildPath, buf)
}