---
order: 6
title: 构建和发布
type: 开发
---

## 构建

当项目开发完毕，只需要运行一行命令就可以打包你的应用：

```
yarn
```

构建打包成功之后，会在根目录生成dist文件夹，里面就是构建打包好的文件，包含若干`*.js、*.css、index.html`等静态文件。

## 环境变量

每个环境都有自己的相应的参数。脚手架中预置了三种环境：开发、测试和正式。可在根目录的`.env.*`文件中查看。不同环境的打包命令不一样，可以在package.json中查看。
vue中并不支持不同环境的配置打包，即打包时候传入的环境变量是一致的

```
NODE_ENV=production
```

所以真正区分环境的变量是`VUE_APP_ENV`。而参数的配置则是在`src/utils/env`下：
```Typescript
export const env = process.env.VUE_APP_ENV;

function getEnvConfig(): IEnvConfig {
  switch (env) {
    case "development":
      return {
        baseUrl: "/api",
      };
    case "staging":
      return {
        baseUrl: "/api",
      };
    case "production":
      return {
        baseUrl: "/api",
      };
    default:
      throw new Error(`未识别的环境类型：${env}`);
  }
}
```

## 分析

如果打包出来的文件太大，可以通过analyze命令构建并分析依赖模块的体积分布，从而优化你的代码。

```
yarn analyze
```

webpack会打包并加载分析插件，自动打开页面可以看到

![](/resource/images/screenshot/analyze-table.png =700x300)

## 发布

对于发布来讲，只需要将最终生成的静态文件，也就是通常情况下dist文件夹的静态文件发布静态服务器即可。

脚手架提供了部署脚本`deploy_web.sh`。部署的时候将脚本和dist压缩包拷贝到根目录，只需要一行命令即可。

```bash
sh ./deploy_web.sh 项目名称
```

会在根目录下创建www/项目名称文件夹，所有的资源文件也会拷贝到其下，上次的资源文件会拷贝到www/backup/项目名称/当前日期文件夹下做个备份。

因为我们采用了h5路由，所以还需要在nginx添加配置

```bash
location / {
  root   项目路径;
  try_files $uri $uri/ /index.html;
}
```