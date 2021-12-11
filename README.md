# 使用service worker优化页面性能

基于*workbox*的SPA首页缓存方案，具体内容见*src/sw.js*、*src/main.js*两个文件的注释

主要缓存了index.html入口文件的请求，其他静态资源则使用http强缓存控制

worker调试
```shell
npm run build
```
在vue.config.js中开启了webpack watch用于调试service worker，因为通过workbox-webpack-plugin生成的service-worker.js文件无法在webpack-dev-server中更新，所以只能用打包后的代码调试worker