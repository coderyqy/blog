var dayjs = require('dayjs')

const dayFormat = (time) => {
  return dayjs(time).format("YYYY-MM-DD HH:mm")
}

module.exports = {
  dayFormat
}