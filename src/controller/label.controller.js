const { getLabel } = require("../service/label.service")

class LabelController {
  async getAllLabel (ctx, netx) {
    const result = await getLabel()
    ctx.body = result
  }
}

module.exports = new LabelController()