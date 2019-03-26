function Validator (data) {
  this.data = data
  this.message = []
}

Validator.prototype.validate = function (handel) {
  this.message = []
  console.log(handel(this))
  // ... bala bala
}

const isEmpty = tip => ({data, message}) => {
  message.push(!!data || new Error(tip))
  return {data, message}
}
const max = tip => ({data, message}) => {
  message.push(data.length <= 6 || new Error(tip))
  return {data, message}
}

module.exports = {
  Validator,
  isEmpty,
  max
}
