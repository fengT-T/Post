---
siderbar: false
---
# 继承

> 老实说 js 的继承设计过于沙雕

## 原型链

对应关系大致如下图

![](./prototype5.png)

## 继承蚂蚁花呗

旧时代 js 青年的继承写法很多, 我以前喜欢这么写

```js
function Super () {
    this.name = 'feng'
    this.PHP = 'the best programming language'
}
Super.prototype.fuck = function () {
  return 'Just Fuck Java C'
}
function Child () {
    Super.call(this)
    this.name = 'feng ying'
}
Child.prototype = Object.create(Super.prototype)
Child.prototype.constructor = Child
console.log(new Child())
console.log((new Child()) instanceof Child)
console.log((new Child()) instanceof Super)
```

传说中道格拉斯封装的继承方法

```js
function inherits(Child, Parent) {
    var F = function () {};
    F.prototype = Parent.prototype;
   Child.prototype = new F();
   Child.prototype.constructor = Child;
}
inherits(Child, Super)
```

## ES6

constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

constructor方法和toString方法之中，都出现了super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。

```js
class Super {
    constructor () {
        this.name = 'feng'
        this.PHP = 'the best programming language'
    }
    fuck () {
        return 'Just Fuck Java C'
    }
}
class Child extends Super {
    constructor () {
        super()
        this.name = 'feng ying'
    }
}
let feng = new Child()
console.log(feng.fuck())
console.log(feng)
console.log(feng instanceof Child)
console.log(feng instanceof Super)
```

## Class 的静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。


```js
class Foo {
    static classMethod() {
        return 'Just Fuck Java C'
    }
}
Foo.classMethod() // 'Just Fuck Java C'
var foo = new Foo()
foo.classMethod()
```