// dotenv是一个插件，把.env文件的变量写入到process.env中
const dotenv = require('dotenv')

dotenv.config()

// 解构
module.exports = {
  APP_PORT,
} = process.env


