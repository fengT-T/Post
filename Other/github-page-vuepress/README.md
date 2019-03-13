---
sidebar: 'false'
---
# 使用 VuePress 搭建沙雕博客

## VuePress 是啥玩意？
[VuePress 介绍](https://v1.VuePress.vuejs.org/zh/guide/#%E5%AE%83%E6%98%AF%E5%A6%82%E4%BD%95%E5%B7%A5%E4%BD%9C%E7%9A%84%EF%BC%9F)

在 VuePress 里面 每一个 Markdown 文件将首先被编译成 HTML，接着作为一个 Vue 组件传入 vue-loader，这意味着你可以在文本中使用 Vue 风格的
 - 插值
 - 指令
 - 组件

> 总之巨他妈灵活

## 搭建配置
npm 素质四联
```bash
# 安装
yarn global add VuePress # 或者：npm install -g VuePress

# 新建一个 markdown 文件
echo '# Hello VuePress!' > README.md

# 开始写作
VuePress dev .

# 构建静态文件
VuePress build .
```
## 文件目录
```
project
├── README.md
├── docs/
├── .VuePress/
│  └── config.js
└── package.json

```

> 在 VuePress 里面 README.md 就是文件夹的默认 markdown 文件

config.js 是配置文件的存放位置

```js
// .VuePress/config.js
module.exports = {
  title: 'T-T', // 标题
  description: 'fengT-T的Github Page', 
  dest: 'docs', // 指定 VuePress build 的输出目录
  base: '/Post/', // 部署站点的基础路径，以斜杠结束。
  themeConfig: { // 主题配置
    displayAllHeaders: true,
    sidebar: 'auto',
    nav: [
      { text: 'JavaScript', link: '/JavaScript/' },
      { text: 'Other', link: '/Other/' },
      { text: 'CoCoMusic', link: 'https://github.com/xtuJSer/CoCoMusic' },
    ]
  },
  evergreen: true
}
```
配置完成之后 `VuePress dev .`就可以开始愉快的写作了

## 配合 Github Page
配合 Github Page 可以搭建一个沙雕博客

Github Page配置如下，选择docs即可

<img src="https://s2.ax1x.com/2019/03/13/AkI9E9.png" width="300" alt="AkI9E9.png" border="0" />

为了配合 Github Page 需要在配置文件 `.VuePress/config.js` 里面
 - 指定  `dest: 'docs'` 即VuePress build 的输出目录为 docs
 - 设置 `base: '/Post/'` //部署站点的基础路径，也就是github上项目的名称，例如本博客的地址是`https://fengt-t.github.io/Post/`那么基础路径就是`/Post/`


 最后 `VuePress build .` 然后 `git push` 到 Github 坐等 Gitpage 发布完成，就可以看到了页面了