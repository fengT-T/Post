let cycle = {}
cycle.cy = cycle

let sy = Symbol('a')

let obj = {
  c: {
    d: 'f' 
  },
}

let a = {
  a: 1,
  obja: obj,
  obj,
  cycle,
  arr: [1, 2, { f: '' }],
  [sy]: 'Symbol'
}

const getType = obj => Object.prototype.toString.call(obj).slice(8, -1)
const baseClone = attr => attr
const iterate = obj => [
  ...Object.getOwnPropertyNames(obj), // 换成 Object.keys 只返回可遍历属性
  ...Object.getOwnPropertySymbols(obj)
]
const stack = new Map()

function objClone (obj) {
  if (stack.has(obj)) {
    return stack.get(obj)
  }
  const init = {}
  stack.set(obj, init)

  return iterate(obj).reduce((newObj, key) => {
    newObj[key] = clone(obj[key])
    return newObj
  }, init)
}

function clone (data) {
  return ({
    'Object': objClone,
    'Array': arr => arr.map(clone)
  }[getType(data)] || baseClone)(data)
}

const newObj = clone(a)
console.log('clone')
console.log(newObj)
console.log('origin')
console.log(a)
console.log(stack)
console.log(newObj.obja === newObj.obj)
console.log(newObj[sy])

console.log('===========')
console.log('newObj.obj.c = 123; newObj.arr[0] = 2233; newObj.cycle.cy = {}')
newObj.obj.c = 123
newObj.arr[0] = 2233
newObj.cycle.cy = {}

console.log('clone')
console.log(newObj)
console.log('origin')
console.log(a)


