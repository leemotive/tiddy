import path from 'node:path';
import { defineConfig } from 'vitepress'
import { vitepressDemoPlugin } from 'vitepress-demo-plugin';

const cssPlugin = {
  name: 'patch-vp-doc-css',
  enforce: 'pre' as const,
  transform(code, id) {
    // 仅处理 vp-doc.css
    if (
      id.includes('components/vp-doc.css')
    ) {
      const transformed = code.replace(
        /\.vp-doc table\b/g,
        '.vp-doc table:not(.el-table__header):not(.el-table__body)'
      ).replace(
        /\.vp-doc (tr|th|td)\b/g,
        '.vp-doc table:not(.el-table__header):not(.el-table__body) $1'
      ).replace()
      return {
        code: transformed,
        map: null
      }
    }
  }
}


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tiddy",
  description: "A set of Vue3 components based on element-plus",
  base: '/tiddy/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '组件', link: '/components/form/' }
    ],

    sidebar: [
      {
        text: '快速开始', link: '/get-started'
      },
      {
        text: '组件',
        items: [
          { text: '表单 - Form', link: '/components/form/' },
          { text: '表格 - Table', link: '/components/table/' },
          { text: '弹窗 - Dialog', link: '/components/dialog/' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/leemotive/tiddy' }
    ]
  },

  vite: {
    resolve: {
      alias: {
        'tiddy': path.resolve(__dirname, '../../dist/')
      }
    },
    plugins: [
      cssPlugin
    ]
  },

  markdown: {
    config: (md) => {
      md.use(vitepressDemoPlugin)
    }
  }
})


