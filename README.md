# 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 主要实现
### 请求接口，使用vant，以电影列表为例
npm init
开发者工具-》工具-》构建npm选项
详情-》使用npm模块
创建movielist云函数-》右键打开终端-》npm install request and request-promise
利用request第三方语法请求接口
创建movelist页面-》请求movielist云函数-》用data保存返回的数据并循环输出


### 提交评价
用setData保存评论，评分
用 wx.chooseImage上传本地图片拿到虚拟路径
用promise包装wx.cloud.uploadFile上传多个图片，用setData保存返回的图片云路径
用promiseAll判断所有异步完成再调用db.collection上传至数据库

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
- [vant组件](https://youzan.github.io/vant-weapp/#/intro)
- [request/request-promise](https://github.com/request/request-promise)

