# CSS盒模型
[CSS盒模型完整介绍](https://segmentfault.com/a/1190000013069516)

# flex
 - flex-direction属性决定主轴的方向 
 ``` css
 .box {
    flex-direction: row | row-reverse | column | column-reverse;
  }
 ```
 flex-wrap 换行
 ``` css
 .box{
    flex-wrap: nowrap | wrap | wrap-reverse;
  }
 ```
 justify-content 属性定义了项目在主轴上的对齐方式
 ``` css
  .box {
    justify-content: flex-start | flex-end | center | space-between | space-around;
  }
 ```
 align-items 属性定义项目在交叉轴上如何对齐。
 ``` css
  .box {
    align-items: flex-start | flex-end | center | baseline | stretch;
  }
 ```
 align-content 属性定义了多根轴线的对齐方式。
 ```css
 box {
    align-content: flex-start | flex-end | center | space-between | space-around | stretch;
  }
```
[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

# CORS 和 JSONP

# 同源策略
同协议同主机同端口

# 事件冒泡 捕获
[事件的传播](https://wangdoc.com/javascript/events/model.html#%E4%BA%8B%E4%BB%B6%E7%9A%84%E4%BC%A0%E6%92%AD)

# 线程 进程
1）地址空间和其它资源（如打开文件）：进程间相互独立，同一进程的各线程间共享。某进程内的线程在其它进程不可见。
2）通信：进程间通信，IPC，线程间可以直接读写进程数据段（如全局变量）来进行通信——需要进程同步和互斥手段的辅助，以保证数据的一致性。
3）调度和切换：线程上下文切换比进程上下文切换要快得多。
4）在多线程OS中，进程不是一个可执行的实体。

# 防抖节流
[JS函数防抖和函数节流](https://juejin.im/post/5a35ed25f265da431d3cc1b1#heading-2)

# 我所知道的 Web 性能优化策略
[Web性能优化](https://segmentfault.com/a/1190000008693178#articleHeader13)
网络
 - DNS Prefetch
 - 预加载
 - 域名收敛
 - 资源 Cache
 - 缓存 LocalStorage （QQ music 把 html 存到 LocalStorage）
 - GZIP & BBR
 - Service Worker Pwa cache api
性能
 - requestAnimationFrame



# postMessage
 [postMessage可太有用了](https://zhuanlan.zhihu.com/p/58654876)

 # http2 
 [http2](https://juejin.im/post/5b88a4f56fb9a01a0b31a67e)

 # http

 # 正则

 # 去重
  ``` js
  [...new Set(arr)];
  // or
  Array.from(new Set(arr));
  ```

  # 前端存储方式

  # 面试题
  [这个前端面试在搞事！](https://zhuanlan.zhihu.com/p/25407758)

  [破解前端面试（80% 应聘者不及格系列）：从 闭包说起](https://zhuanlan.zhihu.com/p/25855075)
  # Generators

  # url => page
  [Duang~输入url浏览器都做了些什么呢？](https://zhuanlan.zhihu.com/p/56503583)
  [从输入URL到页面加载发生了什么？](https://segmentfault.com/a/1190000006879700#articleHeader3)
  [在浏览器地址栏输入一个URL后回车，背后会进行哪些技术步骤？](https://www.zhihu.com/question/34873227)

  # DNS Prefetching
  [预加载系列一：DNS Prefetching 的正确使用姿势](https://tech.youzan.com/dns-prefetching/)

- 面向对象
- 生命周期
- 数据库

css
 - [什么是BFC?](https://juejin.im/post/5a4dbe026fb9a0452207ebe6)
 - [OBKoro1前端积累](http://obkoro1.com/web_accumulate/accumulate/CSS/%E5%8D%95%E8%A1%8C%E5%A4%9A%E8%A1%8C%E6%96%87%E6%9C%AC%E6%BA%A2%E5%87%BA.html)
 - [CSS浮动float详解](https://www.jianshu.com/p/07eb19957991)
 - [CSS 绝对定位 absolute 详解](https://juejin.im/entry/58b3d54e8d6d810057f599bb)
 - [一篇全面的CSS布局学习指南 [译]](https://juejin.im/post/5b3b56a1e51d4519646204bb#heading-2)
 - [yhlben的前端日志](https://yhlben.github.io/blog/js-promise.html#promise-a-%E8%A7%84%E8%8C%83%E8%A7%A3%E8%AF%BB)
 - [年终回顾，为你汇总一份「前端技术清单」](https://juejin.im/post/5bdfb387e51d452c8e0aa902)
 - [一名【合格】前端工程师的自检清单](https://juejin.im/post/5cc1da82f265da036023b628#heading-0)
 - [2019前端工程师自检清单与思考](https://segmentfault.com/a/1190000018873042)
 - [前端工程师手册](https://leohxj.gitbooks.io/front-end-database/html-and-css-basic/semantic-html.html)
 设计模式