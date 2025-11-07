const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',  // 使用相对路径
  outputDir: 'dist',
  assetsDir: 'static',
})
