function Handler(successor, handle) {
  this.successor = successor //下一个
  this.handle = handle
}

Handler.prototype.handle = function (...rest) { // 默认的处理方法
  this.successor && this.successor.handle(...rest)
}

const svip = new Handler(undefined, function (money) {
  money >= 500 && console.log('最尊贵的svip')
})

const vip = new Handler(svip, function (money) {
  money < 500 && money >= 100
    ? console.log('vip会员')
    : Handler.prototype.handle.call(this, money)
})

const begVip = new Handler(vip, function (money) {
  money < 100
    ? console.log('穷逼会员')
    : Handler.prototype.handle.call(this, money)
})

begVip.handle()