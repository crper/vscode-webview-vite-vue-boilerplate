# vscode-webview-vite-vue-boilerplate

这是一个基于Vite 5 + Vue3 + TypeScript + UnoCSS + Vue Router + Pinia
的项目模板，可以用于开发 VS Code Webview的插件

## 功能

- [x] 全功能的 web 页面开发（Vue3 + TypeScript + UnoCSS + Vue Router + Pinia）
- [x] 支持纯网页端的开发(常规网页开发),支持热更新
- [x] VS Code Webview 插件内嵌开发(VS Code Debug & Render Webview )
- [x] 支持一键式打包编译出 VS Code 本地版本vsix插件
- [x] VS Code Plugin 插件开发的一些配置项及初始化(插件版本、视图名、快捷键绑定等)
- [x] CSP策略对 Webview 页面友好，开放https链接和内联样式的注入

## 快速开始

1. 安装全局依赖: [@vscode/vsce](https://www.npmjs.com/package/@vscode/vsce)

```bash
pnpm add -g @vscode/vsce

# 不然后面的调用需要用 npx 命令这种去执行，看你们喜好了
# 工程内的本地打包命令会调用这个模块，所以需要全局安装，发布也依赖 vsce 提供的 cli 去做的

```

2. 安装工程依赖

```bash
# 该命令同时处理好整个工程开发所需要的依赖
pnpm install:all
```

3. 运行工程

```bash
# 纯 Web开发，就是常规浏览器网页开发，有热更新
pnpm dev:web


# VS Code 插件开发,可以 debug 和 渲染 Webview
# 代码会随时编译，若是进入debug 窗口后的改动，需要 reload webview 才能看到最新改动
# 第一次进入 debug ，默认就是代码编译后的最新的改动
pnpm dev

```

4. 打包本地版本插件 vsix

```bash
# 本地打包并调用 vsce 模块打出一个本地插件，存放在根目录
# 类似：vscode-webview-vite-vue-boilerplate-0.0.1.vsix
pnpm pack:vsix
```

## Demo 视频

[command demo](https://www.yuque.com/crper/blog/ithzqu45gd6y2ts5)

## 技术栈

| 库名                                                  |  版本  |     说明 |
| :---------------------------------------------------- | :----: | -------: |
| [Vue](https://github.com/vuejs/core)                  |  3.x   |   视图层 |
| [Vue Router](https://github.com/vuejs/vue-router)     |  4.x   | 路由管理 |
| [Pinia](https://github.com/vuejs/pinia)               |  2.x   | 状态管理 |
| [Vite](https://github.com/vitejs/vite)                |  5.x   | 构建工具 |
| [Typescript](https://github.com/microsoft/TypeScript) |  5.x   | 类型检查 |
| [ESLint](https://github.com/eslint/eslint)            |  8.x   | 代码检查 |
| [Naive UI](https://github.com/TuSimple/naive-ui)      |  2.x   |     UI库 |
| [Unocss](https://github.com/unocss/unocss)            | 0.59.x | Atom CSS |
| [PNPM](https://github.com/pnpm/pnpm)                  |  8.x   | 包管理器 |

## 目录结构

```
├── package.json # VS Code插件的很多配置项和预设都从这里读取的，包括开发和发布插件
├── pnpm-lock.yaml
├── README.md
├── resource  # 用来放一些静态资源，用于发布插件配置加载，比如插件的图标
│  └── extension-icon.svg
├── src
│  ├── extension.ts # 插件的入口文件
│  ├── panels # 插件的webview页面
│  │  └── VueBoilerplatePanel.ts
│  ├── test # 测试用例
│  │  └── extension.test.ts
│  └── utils  # 插件的一些自定义工具方法
│     ├── getNonce.ts
│     └── getUri.ts
├── tsconfig.json # 插件的 ts 配置
├── vsc-extension-quickstart.md #   官方的插件开发指南
└── webview-ui # Vite + Vue 插件开发模板(webview 页面)
   ├── auto-imports.d.ts # 帮助TypeScript理解这些自动导入的元素，即使你在代码中没有显式导入它们。
   ├── components.d.ts # 帮助TypeScript理解这些自动导入的元素，即使你在代码中没有显式导入它们。
   ├── index.html
   ├── package.json # 工程依赖
   ├── pnpm-lock.yaml
   ├── public
   │  └── vite.svg
   ├── README.md
   ├── src
   │  ├── App.vue # 根组件
   │  ├── assets # 静态资源
   │  ├── components # 公共组件
   │  ├── layout # 布局组件
   │  ├── main.ts # 工程入口文件
   │  ├── router # 路由配置
   │  ├── store # 状态管理
   │  ├── style.scss # 样式
   │  ├── utils # 工具方法
   │  ├── views # 页面
   │  └── vite-env.d.ts
   ├── tsconfig.json
   ├── tsconfig.node.json
   ├── uno.config.ts # uno.css 配置
   └── vite.config.ts  # 工程Vite配置

```

## FAQ

### VSCode webview 对于资源的注入很严格

目前的策略是把 web 站点打包成一个index.js和 index.css去注入（必须转换成 vscode 允许的资源格式）

```typescript
//path: src/panels/VueBoilerplatePanel.ts
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    // The CSS file from the Vue build output
    const stylesUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.css"]);
    // The JS file from the Vue build output
    const scriptUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.js"]);
    const nonce = getNonce();

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none';connect-src https:; style-src ${webview.cspSource} 'unsafe-inline'; img-src ${webview.cspSource} https: data:; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" crossorigin nonce="${nonce}" type="text/css" href="${stylesUri}">
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
          <title>Hello World</title>
        </head>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `;
  }

```

1. `meta`的 csp 策略进行了修改，允许加载部分资源，而不是默认各种卡死，对 web 开发友好
2. `index.html`的 `script` 和 `link` 标签的 `src` 和 `href` 都进行了转换，还有 hash 防缓存

### 如何打包所有文件到一个index.js 和 index.css

- css和js需要打包成单独文件

```typescript
// path: webview-ui/vite.config.ts

  build: {
    modulePreload: false, // 关闭预加载
    outDir: "build", // 打包输出目录
    emptyOutDir: true, // 打包之前清空build 文件夹
    assetsInlineLimit: 99999999999, // 默认是4096
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`, // 打包后的入口文件
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        manualChunks: (id: string) => { // 打包后的静态资源,自定义策略，全部合并到 index
          return 'index'
        }
      },
    },
  },

```

- png这类静态图片直接打包成base64(参考上面的 `assetsInlineLimit`)

- svg 用 vite-svg-loader, 默认转换为 Component

```typescript
// path: webview-ui/vite.config.ts
svgLoader({ defaultImport: 'component' }),

// 在使用层面可以通过 query(?) 来转换 svg 为内联或者其他
// 具体可以去看这个插件的介绍，挺强大的

```

### 路由模式

因为内嵌 webview 不像浏览器有路由导航栏这些，一般 webview 没有前进后退的概念，这种我们的路由跳转优先采用内存路由（memory router）, 它非常适合需要完全控制历史堆栈的场景, 类似 Vue 或者 React 都有提供！！

- [Vue Memory-mode](https://router.vuejs.org/guide/essentials/history-mode#Memory-mode)
- [React Memory-mode](https://reactrouter.com/en/main/router-components/memory-router)

## 扩展指南

VS Code 官方扩展指南

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## 更多信息

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
- [Webview ui toolkit started](https://github.com/microsoft/vscode-webview-ui-toolkit/blob/main/docs/getting-started.md)
- [loading-local-content](https://code.visualstudio.com/api/extension-guides/webview#loading-local-content)
- [vsc-extension-quickstart](vsc-extension-quickstart.md)

**Enjoy!**
