# 职责链模式

> 职责链模式（Chain of responsibility）是使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系。将这个对象连成一条链，并沿着这条链传递该请求，链中收到请求的对象要么亲自处理它，要么转发给链中的下一个候选者。提交请求的对象并不明确知道哪一个对象将会处理它——也就是该请求有一个隐式的接受者（implicit receiver）。根据运行时刻，任一候选者都可以响应相应的请求，候选者的数目是任意的，你可以在运行时刻决定哪些候选者参与到链中。

  创建多个对象，使这些对象形成一条链，并沿着这条链传递请求，直到链上的某一个对象决定处理此请求。


## 简单实现
默认的处理方法就是查看是否有 successor， 如果有的话就执行 handle 方法,没有的话就传递给下一个处理，当然你也改成别的逻辑。
```js
function Handler(successor, handle) {
  this.successor = successor //下一个
  this.handle = handle
}

Handler.prototype.handle = function (...rest) { // 默认的处理方法
  this.successor && this.successor.handle(...rest)
}

Handler.prototype.next = Handler.prototype.handle
```

## 使用
在这个使用范例里面，要么处理请求，要么将请求发送给下一个接收者。
```js
const svip = new Handler(undefined, function (money) {
  money >= 500 && console.log('最尊贵的svip')
})

const vip = new Handler(svip, function (money) {
  money < 500 && money >= 100
    ? console.log('vip会员')
    : this.next(money)
})

const begVip = new Handler(vip, function (money) {
  money < 100
    ? console.log('穷逼vip')
    : this.next(money)
})

begVip.handle(3) //穷逼vip
begVip.handle(100) //vip会员
begVip.handle(500) //最尊贵的svip

```

## 参考

汤姆大叔牛逼好吧，我是买过书的，拿来做个笔记也不算白嫖。

[设计模式之职责链模式](https://www.cnblogs.com/TomXu/archive/2012/04/10/2435381.html)