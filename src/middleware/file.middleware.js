const path = require('path')

const Multer = require('koa-Multer')
const Jimp = require('jimp')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file-path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const pictureUpload = Multer({
  dest: PICTURE_PATH
})
const pictureHandler = pictureUpload.single('picture')


module.exports = {
  avatarHandler,
  pictureHandler
}