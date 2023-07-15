import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/admin/', // 添加顶级路由
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: { // 设置跨域
      '/api': {
        // changeOrigin: true,  //开启代理:在本地会创建一个虚拟服务端，然后发送请求数据
        target: 'http://localhost:5000',  //这里是后端接口
        changeOrigin:true,
        rewrite: (path) => {
          return path.replace(/^\/api/,'')
        }
      },
      '/uploadFile': { // 工程的接口以/api开头
        target: 'http://localhost:5000', // 被代理服务
        changeOrigin: true, // 改变源
      },
    }
  },
})
