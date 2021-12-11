const path=require('path')
const WorkboxPlugin = require('workbox-webpack-plugin');
const swSrc=path.resolve(process.cwd(),'src/sw.js')
console.log(swSrc)
module.exports = {
  lintOnSave:false,
  configureWebpack: {
    plugins: [
      new WorkboxPlugin.InjectManifest({
        // 这些选项帮助快速启用 ServiceWorkers
        // 不允许遗留任何“旧的” ServiceWorkers
        swSrc,
        swDest:'service-worker.js',
        include:[]
      }),
    ],
  watch:true

  },
}