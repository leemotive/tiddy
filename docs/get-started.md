# 快速开始

本节将介绍如何在项目中使用 Tiddy 组件库。

## 安装
```bash
# use npm
npm install tiddy

# or use yarn
yarn add tiddy

# or use pnpm
pnpm add tiddy
```

## 样式

Tiddy 组件库基本只有很少量的样式，可以手动导入就好了。只有 575 bytes, 不到 1KB
```ts
import 'tiddy/index.css';
```
或者在sass中导入
```scss
@use "tiddy/index.css";
```

但是在Tiddy中我们引用了一些element-plus的组件，所以需要在项目中引入element-plus的样式。如果你在项目中使用了element-plus组件按需导入，用到哪个组件就自动引入哪个组件的样式。那它可能识别不到tiddy中引用的那些element-plus组件，从而导致样式缺失。所以需要你在对构建工具进行配置，让它识别到tiddy中引用的element-plus组件，然后自动引入它的样式。

::: code-group
```ts [vite.config.ts]
// TODO

```
:::