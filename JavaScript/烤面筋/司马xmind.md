## new 函数
 > - [详解 JS 中 new 调用函数原理](https://segmentfault.com/a/1190000015424508#articleHeader13)
 > - [JavaScript中判断函数是new还是()调用](https://www.cnblogs.com/snandy/archive/2011/04/03/2004217.html)

 return 语句 

## this
 
 - [this的指向（附面试题）](https://segmentfault.com/a/1190000011817793#articleHeader5)
 - [一道常被人轻视的前端JS面试题](https://www.cnblogs.com/xxcanghai/p/5189353.html)
 - [this的指向（附面试题）](https://segmentfault.com/a/1190000011817793)
 - [面试官问：JS的this指向](https://segmentfault.com/a/1190000017510043#articleHeader0)

``` js
  function Parent() {
    this.a = 1;
    this.b = [1, 2, this.a];
    this.c = { demo: 5 };
    this.show = function () {
      console.log(this.a , this.b , this.c.demo);
    }
  }
  function Child() {
    this.a = 2;
    this.change = function () {
      this.b.push(this.a);
      this.a = this.b.length;
      this.c.demo = this.a++;
    }
  }
  Child.prototype = new Parent();
  var parent = new Parent();
  var child1 = new Child();
  var child2 = new Child();
  child1.a = 11;
  child2.a = 12;
  parent.show();
  child1.show();
  child2.show();

  child1.change();
  child2.change();
  parent.show();
  child1.show();
  child2.show();
  ```
