# JS 基础知识点 - 类型转换骚操作集锦

## 原始（Primitive）类型
在 JS 中，存在着 6 种原始值，分别是：
 - boolean
 - null
 - undefined
 - number
 - string
 - symbol

 其中 JS 的 `number` 类型是浮点类型的，在使用中会遇到某些 `Bug`，比如 0.1 + 0.2 !== 0.3，`string` 类型是不可变的，无论你在 `string` 类型上调用何种方法，都不会对值有改变。

## typeof vs instanceof

`typeof` 对于原始类型来说，除了 `null` 都可以显示正确的类型。
```js
> typeof null
'object' // ？？？？ 有毒吧
```
`instanceof` 检查原型链，判断构造器。
`Symbol.hasInstance` 重新定义 `instanceof` 行为

```js
class PrimitiveString {
  static [Symbol.hasInstance](x) {
    return typeof x === 'string'
  }
}
console.log('hello world' instanceof PrimitiveString) // true
```

## 类型转换
js的类型转换其实很的单纯，没有三位一体之类的那么玄，本来破语言就是10天肝出来的，哪有那么多时间搞那么多操作。

### 转 Boolean
在条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。

`js` 转 `boolean` 还是很稳的

### 转 字符串 

转字符串有什么好讲的啊
|原始值|结果|
|:--:|:--:|
|number|666 => '666'|
|null|'null'|
|undefined|'undefined'|
|true|'true'|
|false|'false'|

对象调用自己的 toString 方法
|原始值|结果|
|:--:|:--:|
|{}|"[object Object]"|
|[1,2,4]|"1,2,4"|
|() => {}|"() => {}"|
### 转 数字
原始类型转数字（只需要记住下面几在个就行）：

|原始值|结果|
|:--:|:--:|
|string|'' => 0, '1' => 1, 'a' => NaN|
|null|0|
|undefined|NaN|
|false|0|
|true|1|

:::warning
parseInt 是个函数 行为 和 类型转换 稍微有一点不一样
``` js
> parseInt('123da')
123
> +'123da'
NaN
```
:::

非原始类型转数字详细情况，见下一节的介绍当需要转数字的时候执行"number"转换。

:::tip
即先执行对象的 `valueOf`方法，如果没有得到原始类型的值（如果没有重写`valueOf`默认是返回对象本身所以肯定不是原始类型），再执行`toString`，`toString`默认返回字符串是原始类型，所以 对象转数字实际上如果没有重写 `valueOf` `toString`的话，全是看 `toString`返回什么，然后根据 `toString` 的结果来 转换成数字）
:::
举个例子如果没有重写那两个方法 对象转数字是下面的规律 ：

|原始值|结果|
|:--:|:--:|
|Array| 空数组0,存在一个元素为数字就转成数字，其他都是NaN |
|除数组以外的引用类型|NaN|

对于 `Array`， `[1, 2, 3] => '1,2,3' => NaN ` ` [1] => '1' => 1` 所以你知道为啥数组只有第一个元素为数字能转成数字别的都是返回`NaN`了吧，而对象的`toString` 方法都是返回 `"[object Object]"` 之类的鬼东西，当然全是 `NaN` 了

## 对象转原始类型
方法 `toString` 和 `valueOf` 来自上古时代。先执行谁，取决于上下文，转换具有所谓的“暗示”。
::: tip
对于对象，不存在 to-boolean 转换，因为所有对象在布尔上下文中都是 true。所以只有字符串和数值转换。布尔值不当人。
:::

这里有三种变体：

 - "string" 当一个操作期望一个字符串时，对于对象到字符串的转换，比如 `a + '1'`

 - "number" 当一个操作需要一个数字时，用于对象到数字的转换，如 `a + 1`

 - "default" 在少数情况下发生，当操作者“不确定”期望的类型时。例如，二进制加 + 可以和字符串（连接）和数字（相加）发生作用，所以类型是字符串和数字都可以。或者当一个对象用 == 与一个字符串、数字或符号进行比较时。

大于/小于运算符 `<>` 也可以同时用于字符串和数字。不过，它使用 “number” 暗示，而不是 “default”。这是历史原因。

::: tip
扯了这么多实际上只要不是暗示 string 其他的都是 `valueOf` 先执行
:::

为了进行转换，JavaScript 尝试查找并调用三个对象方法：
 - 如果`obj[Symbol.toPrimitive](hint)`这个方法存在的话，就仅仅只调用 `obj[Symbol.toPrimitive](hint)`方法， 换句话说如果有`obj[Symbol.toPrimitive](hint)`就只尝试调用这个方法，这个方法不返回基本类型就凉了，当场报错。
 - 否则如果暗示是 "string"
   - 尝试 `obj.toString()` 和 `obj.valueOf()`，看谁先返回基础类型，返回的基础类型参与计算。
 - 否则，如果暗示 "number" 或者 "default"
   - 尝试 `obj.valueOf()` 和 `obj.toString()`，看谁先返回基础类型，返回的基础类型参与计算。
:::warning
如果返回的基础类型不满足运算条件，还会再次转换，例如 `1*[] = 0`, `[]` 转成基础类型返回的是 `'' `, `''` 参与计算。但是乘法需要数字所以 `''` 会再次转成数字 `0`,
:::
:::tip
实际上不重写`valueOf`的话，`valueOf`总是默认返回对象自己，对象又不是基础类型，到时候还是得看`toString`返回的，但是 js 鸡贼的很，`toString`默认返回字符串可以兜底，丝毫不慌。那么如果两个方法都没有返回基础类型呢。

事实上，如果你重写了`obj.valueOf()` 和 `obj.toString()`让这两个都返回一个对象，那么转换为原始类型的时候当场报错`Uncaught TypeError: Cannot convert object to primitive value`

机智的你似乎想到了什么

一行代码让猪队友从此告别 对象类型转换
```js
Object.prototype.toString = () => ({})
Object.prototype.valueOf = () => ({})
```
:::

一个简单的例子，谁看谁知道：
``` js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

关于“暗示”的一些例子，一般就加法比较特殊，因为字符串可以执行加法，才显得比较特殊
``` js
> ({}).toString()
'[object Object]'
> ({}) + {} // 就是'[object Object]' + '[object Object]'
'[object Object][object Object]'
> ({}) + 1 // 就是'[object Object]' + 1
'[object Object]1'
> [].toString()
''
> +'' // ''转数字
0
> 1 * [] // 就是 1 * ''
0
> 1 + + [] // 就是 1 + (+[])
1
> +[] // 就是 +''
0
> ({}) + []
'[object Object]'
> {} + []
0
```
:::warning
 {} + [] = 0 是一道思考题
:::

## 比较

### 字符串间的比较
在比较字符串的大小时，会使用“字典”或“词典”顺序进行判定。
:::warning
非ASSIC顺序，而是 Unicode 编码顺序
也就是说 'a' > 'A', 

py,rust等新语言对本条点赞, c 语言表示 不屑，
:::

### === 与 同类型 == 
这个没什么好讲的吧

### 不同类型间的比较
当不同类型的值进行比较时，它们会首先被转为数字（number）再判定大小。

转换规则见上面的[转 数字](#%E8%BD%AC-%E6%95%B0%E5%AD%97)

```js
> [] == 0 // 实际上就是 '' == 0
true
> '2' > 1
true
> '2' == 2
true
> 1 == true
true
> 0 == false
true
> '' == 0
true
```

```js
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // true
```

### 涉及 null 和 undefined 的不同类型间比较
:::danger
FBI Warning

`undefined` 和 `null` 在不同类型间的相等性检测 `==` 中不会进行任何的类型转换，它们有自己独立的比较规则，所以除了它们之间互等外不会等于任何其他的值。

`> < >= <=` 不一样，这几个符合上面的转化成 数字 的解释
:::

``` js
> null > 0 // 0 > 0
false
> null == 0 // 特殊规则，不类型转换等效于 null === 0
false
> null >= 0 // 0 >= 0
true
> undefined > 0 // NaN > 0
false
> undefined < 0 // NaN < 0
false
> undefined == 0 // NaN == 0
false
> undefined == null // 特殊规则，就是相等，好气啊
true
```



