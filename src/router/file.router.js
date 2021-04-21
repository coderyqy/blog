const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')

const { avatarHandler, pictureHandler, mainPictureHandler } = require('../middleware/file.middleware')
const { saveAvatarInfo, savePictureInfo, saveMainPicture } = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' })

// 上传头像
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
// 上传动态配图
fileRouter.post('/picture/:articleId', pictureHandler, savePictureInfo)
// 上传文章主图
fileRouter.post('/mainpicture/', mainPictureHandler, saveMainPicture)


module.exports = fileRouter