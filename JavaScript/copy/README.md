# js 简易深拷贝

实现一个简易的深拷贝，满足
 - 对象、数组拷贝
 - 解决循环引用，引用丢失
 - 拷贝Symbol

## code
不多哔哔，直接上代码
```js
const getType = obj => Object.prototype.toString.call(obj).slice(8, -1) // 获取类型
const baseClone = attr => attr // 直接返回不解释
const iterate = obj => [
  ...Object.getOwnPropertyNames(obj), // 换成 Object.keys 只返回可遍历属性
  ...Object.getOwnPropertySymbols(obj) // 遍历出symbols
]
const stack = new Map()

function objClone (obj) { // 对象属性克隆
  if (stack.has(obj)) {
    return stack.get(obj)
  }
  const init = {}
  stack.set(obj, init)
  // 对象 属性递归拷贝
  return iterate(obj).reduce((newObj, key) => {
    newObj[key] = clone(obj[key])
    return newObj
  }, init)
}

function clone (data) { // 根据类型调用克隆方法
  return ({
    'Object': objClone,
    'Array': arr => arr.map(clone)
  }[getType(data)] || baseClone)(data)
}

const newObj = clone(a)
```

## 循环引用
关于循环引用，使用了一个 `map` 来存储 对象的引用，一旦发现相同的引用存在于 `map` 中就返回 `map` 中存储的拷贝，而不会不断递归下去导致爆栈，同样也能解决引用丢失问题，发现相同的引用也会返回 `map` 中存储的相同拷贝。

```js
if (stack.has(obj)) {
  return stack.get(obj)
}
```

## Symbol 和 不可遍历属性
一共有这么几个方法可以获取对象的属性
 - `Object.keys` 可枚举属性
 - `Object.getOwnPropertyNames` 可枚举属性及不可枚举属性
 - `Object.getOwnPropertySymbols` 可枚举属性及不可枚举属性
 - `for..in` 可枚举自身属性以及可枚举继承属性	

这里使用 `Object.getOwnPropertySymbols` 和 `Object.getOwnPropertyNames` 来获取属性数组

## 参考
 - [属性的可枚举性和所有权](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
 - [Lodash是如何实现深拷贝的 ](https://github.com/yygmind/blog/issues/31)


## 完整包含测试的程序如下
<iframe height="600px" width="100%" src="https://repl.it/@fengT_T/Copy?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>