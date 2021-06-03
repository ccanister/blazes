---
order: 1
title: 介绍
type: 入门
---

## 环境搭建

vue开发环境至少需要安装[Node.js](https://nodejs.org/zh-cn/)（安装完Node.js后，npm可以直接使用，推荐使用Yarn，安装依赖包时候会省去很多麻烦）、VSCode编辑器。npm或者Yarn下载包时候默认使用国外源，可以用淘宝镜像替换。
```bash
# npm设置淘宝源
npm config set registry https://registry.npm.taobao.org
# 全局安装Yarn
npm install -g yarn
yarn -v	# 查看Yarn版本
# yarn设置淘宝源
yarn config set registry https://registry.npm.taobao.org	
```

## 开始新项目

当前只支持从gitlab上克隆代码获得：
```bash
git clone http://47.102.45.254/CommonPlatFrom/webDemo.git
cd webDeom
yarn
```

运行
```
yarn serve                								  
```
启动完成后打开浏览器访问[http://localhost:8081](http://localhost:8081)，如果看到如下页面则代表成功。

![开始](/resource/images/screenshot/start.png =700x300)

至此可以开始着手开发。

