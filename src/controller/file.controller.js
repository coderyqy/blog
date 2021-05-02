const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT, APP_IMAGE_UQL } = require('../app/config')

class FileController {
  async saveAvatarInfo (ctx, next) {
    // 1.获取图像相关的信息
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    // 2.将图像信息数据保存到数据库中
    const result = await fileService.createAvatar(filename, mimetype, size, id)
    // 3.将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
    await userService.updateAvatarUrlById(avatarUrl, id)
    // 4.返回结果
    ctx.body = '上传头像成功~'
  }

  // 返回图片信息
  async savePictureInfo (ctx, next) {
    const files = ctx.req.files
    const { articleId } = ctx.params
    const { filename, mimetype, size } = files[0]
    await fileService.createFile(filename, mimetype, size, articleId)
    ctx.body = {
      status: 200,
      imgUrl: `${APP_IMAGE_UQL}:${APP_PORT}/article/image/${filename}`,
    }
  }

  // 返回图片信息
  saveAddPictureInfo (ctx, next) {
    const files = ctx.req.files
    const { filename, mimetype, size } = files[0]
    console.log(filename, mimetype, size)
    ctx.body = {
      status: 200,
      imgUrl: `${APP_IMAGE_UQL}:${APP_PORT}/article/imageadd/${filename}?mimetype=${mimetype}`,
    }
  }

  // 返回图片信息
  saveMainPicture (ctx, next) {
    const files = ctx.req.file
    const { filename, mimetype } = files
    ctx.body = {
      status: 200,
      imgUrl: filename,
      mimetype: mimetype
    }
  }
}

module.exports = new FileController()