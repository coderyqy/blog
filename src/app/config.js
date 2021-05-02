// dotenv是一个插件，把.env文件的变量写入到process.env中
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

// 解构
module.exports = {
  APP_PORT,
  APP_IMAGE_UQL
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY
