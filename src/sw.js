import { registerRoute } from 'workbox-routing';
import { PrecacheController } from 'workbox-precaching';
import * as strategies from 'workbox-strategies';
import { BroadcastUpdatePlugin } from 'workbox-broadcast-update';
import { setCacheNameDetails } from 'workbox-core';
self.__WB_MANIFEST
//设置precache缓存名称，与StaleWhileRevalidate规则的名称复用
setCacheNameDetails({
  precache: 'document',
  prefix: '',
  suffix: ''
})
const precacheController = new PrecacheController();
/**
 * 手动控制缓存
 * 因为registerRoute在worker第一次安装时捕获不到安装前发生的请求，所以这里调用precache插件在woker首次安装时写入index.html的缓存
 * 仅缓存入口文件，其他资源使用cdn的强缓存配置
 */
precacheController.addToCacheList([{
  url: '/',
  revision: null,
}]);
self.addEventListener('install', (event) => {
  event.waitUntil(precacheController.install(event));
  //强制用户更新woker，同时在main.js中提示刷新
  self.skipWaiting()
});

self.addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate(event));
});
/**
 * 这里注册一个路由规则，捕获所有mode为navigate类型的请求，也就是页面访问的请求，并写入缓存
 * 调用BroadcastUpdatePlugin捕获缓存的更新并广播给主线程，在main.js中监听事件并提示用户刷新
 */
registerRoute(
  ({ request }) => {
    console.log(request)
    return request.mode === 'navigate'
  },
  new strategies.StaleWhileRevalidate({
    cacheName: 'document',
    plugins: [
      new BroadcastUpdatePlugin()
    ],
  }),
);
console.log(3123123333222)