import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
const refresh=()=>{
  alert('检测到新版本，即将重新加载页面')
  location.reload()
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', async (event) => {
    console.log(event)
    //资源缓存更新事件，监听到之后提示用户刷新用以载入最新的缓存内容
    if (event.data.meta === 'workbox-broadcast-update') {
      const {cacheName} = event.data.payload;
      if(cacheName==='document'){
        refresh()
      }
    }
  });
  //worker更新时提示用户刷新
  navigator.serviceWorker.addEventListener('controllerchange', (e) => {
    console.log(e)
    refresh()
  })
  navigator.serviceWorker.register('/service-worker.js')

}