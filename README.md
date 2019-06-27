# client-web

> A Vue.js project
>
> {:.no_toc}
>
> * 目录
{:toc}

### 0. Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 1 环境
#### 1.1 配置环境
``` bash
# 安装依赖 ElementUI (http://vuejs-templates.github.io/webpack/)
npm i

# 安装依赖 axios (https://www.kancloud.cn/yunye/axios/234845)
npm install axios

# 安装依赖 ECharts (https://echarts.baidu.com/download.html)
npm install echarts
```
#### 1.2 运行

``` bash
# 在所在文件夹
npm run dev

```
### 2. 设计概述

#### 2.1 技术选型及理由

**webpack+vue+vue-router+ElementUI+axios+ECharts**

- vue：一套用于构建用户界面的渐进式框架
- vue-router：Vue.js的官方路由器
- ElementUI：一个ui库，它不依赖于vue。但是却是当前和vue配合做项目开发的一个比较好的ui框架。
- webpack：用来打包js工程的工具
- axios：一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中
- ECharts：一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上

**Vue**

Vue是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

**vue-router**

vue-router 和 vuex 是官方提供的前端路由和数据状态管理的库，能够完美地结合 Vue 框架，实现前端路由和应用数据状态管理，代码结构清晰，程序复杂度降低。

**Element UI**

一个ui库，它不依赖于vue。但是却是当前和vue配合做项目开发的一个比较好的ui框架。
该框架封装了多种 UI 组件，使用方便，极具效率，设计简洁直观的操作流程；语言表达清晰且表意明确，让用户快速理解进而作出决策；界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。

**webpack**

当下前端最流行的构建打包工具，利用 webpack 搭配相应的 loader，可以在前端项目中使用 es6 进行开发，效率更高，开发完成后，webpack 还可以将代码编译到 es5 以兼容大部分浏览器；
webpack 2优化了构建打包的算法，优化前端的模块加载，整合各个文件的代码、图片、字体、样式表等等，使得构建打包后的产品代码体积更小，也减少了这些资源在传输给用户时的时间损耗。

**axios**

axios是基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 node.js 中使用
在浏览器中发送 XMLHttpRequests 请求；在 node.js 中发送 http请求；支持 Promise API；拦截请求和响应；转换请求和响应数据；自动转换 JSON 数据；客户端支持保护安全免受 XSRF 攻击；简单、轻量，不会影响前端的加载速度。

**ECharts**

是百度的一个开源的数据可视化工具，一个纯 Javascript 的图表库，能够在 PC 端和移动设备上流畅运行，兼容当前绝大部分浏览器（IE6/7/8/9/10/11，chrome，firefox，Safari等），底层依赖轻量级的 Canvas 库 ZRender，ECharts 提供直观，生动，可交互，可高度个性化定制的数据可视化图表。创新的拖拽重计算、数据视图、值域漫游等特性大大增强了用户体验，赋予了用户对数据进行挖掘、整合的能力。
ECharts 属于开源软件，并且我们提供了非常炫酷的图形界面，特色是地图，另外还提供了柱状图、折线图、饼图、气泡图及四象限图等； 
ECharts 使用简单，在官网中为我们封装了 JS，只要会引用就会得到完美的展示效果； 
ECharts 种类多，ECharts 实现简单，各类图形都有；相应的模板，还有丰富的 API 及文档说明，非常详细； 
ECharts 兼容性好，基于HTML5，有着良好的动画渲染效果。 

#### 2.2 架构设计

挣闲钱后台管理系统主要包括用户身份认证，审核发布的任务和查看用户目录等开发内容，还应提供配置项用于构建项目打包时的目标路径及服务器地址等信息，同时还要进行单元测试与集成测试。根据需要，项目确定有以下四个包：

- build：开发环境和构建项目的代码

- config：项目的webpack打包配置

- node_modules：elementui的控件样式源码

- src：项目的源代码，主要都在src中进行开发

- test：单元测试等系列测试代码

#### 2.3 模块划分

根据业务逻辑和UI设计图，将挣闲钱后台管理系统前端分为6个页面：

- login：后台管理者登录页面
- index：后台管理功能页面
- changewd：管理员密码修改页面
- user_exam：用户信息认证页面
- user_list：用户信息列表页面
- information：管理员信息页面
- task_list：任务信息列表页面
- task_exam：任务审核列表页面

挣闲钱后台管理系统各界面渲染、路由控制等操作都在前端通过axios完成，采取组件化开发的思想，将每个页面抽象为一个组件，页面中也可以包含子组件，实现将多个页面在首页作为一个控件进行跳转。

系统的多个功能界面全部整合在 components 中；
系统的功能界面作为主页index的<router-view>控件进行显示；
系统的界面跳转由前端路由 router 进行控制；
系统的与服务器交互的接口在config中实现配置
assets 存放前端的静态资源，例如图片、图标和字体等。

综合考虑使用的技术框架，并根据应用需要的组件，可以得到详细的项目结构如下所示。如果过需要新增界面、功能，引入新组件，也可以很方便地将新内容添加到项目中去。

```
.
├── index.html # 管理系统主界面框架
├── build      # 提供开发环境和构建项目的代码
├── config     # 项目的webpack打包配置
├── server     # 处理web端和服务器数据传递涉及的跨域等问题
├── src        # 商家管理系统开发代码
|   ├── api # axios封装成函数
|   ├── assets # 存放前端的静态资源，例如图片、图标和字体等
│   ├── components # 页面
│   │   ├── changepwd.vue # 修改密码页面
|   |   ├── home.vue       # 首页统计页面
│   │   ├── information.vue  # 管理员信息页面
│   │   ├── user_exam.vue  # 用户审核页面
│   │   ├── user_list.vue  # 用户列表页面
│   │   ├── task_list.vue  # 任务目录页面
│   │   └── task_exam.vue  # 任务审核页面
|   |
│   ├── router # 页面组件
│   │   └── index.js # 页面跳转路由
|   |
│   ├── view # 主界面页面
│   |   ├── login.vue       # 登录界面
│   |   └── index.vue       # 主页
|   |
│   ├── service   # 公共服务
│   |   ├── api.js    # 与服务器进行数据传递的地址与方法处理
│   |   └── auth.js   # 授权操作
|   |
│   ├── main.js     # 全局初始化
|   └── App.vue   # 网页进入入口  
|   |
├── test       # 测试
|   ├── unit       # 单元测试
|   └── e2e        # 端到端测试
|   |
├── .babelrc       # babel编译参数，vue开发需要babel编译 
└── package.json   # 项目文件，记载着一些命令和依赖还有简要的项目描述信息
```

### 3 页面
  
#### 3.1 登录页面
  
![](/src/assets/登录界面.png)
  
#### 3.2 首页
  
![](/src/assets/首页.png)
  
**强大的统计能力** 
  
![](/src/assets/强大的统计能力.png)
  
![](/src/assets/分析用户信誉度.png)
  
#### 3.3 用户列表页面
  
![](/src/assets/用户列表.png)
  
#### 3.4 用户审核页面
  
![](/src/assets/用户审核.png)
  
#### 3.5 任务审核页面
  
![](/src/assets/任务审核.png)
  
#### 3.6 修改密码页面
  
![](/src/assets/修改密码.png)