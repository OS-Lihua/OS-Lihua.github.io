# React Bits 组件

这个目录包含从 [React Bits](https://www.reactbits.dev) 复制的组件。

## 使用方法

1. 从 https://www.reactbits.dev 选择你需要的组件
2. 复制组件代码到这个目录下的相应文件
3. 确保安装了必要的依赖项（主要是 framer-motion）
4. 在 Astro 页面中导入和使用组件

## 依赖项

- `framer-motion` - 用于动画效果
- `@preact/compat` - 确保 React 组件与 Preact 兼容
- `clsx` - 用于条件类名
- `tailwind-merge` - 用于合并 Tailwind 类名

## 注意事项

- 所有组件都应该与 Preact 兼容
- 确保在 Astro 组件中正确设置 `client:load` 或其他客户端指令
- 某些复杂的动画组件可能需要额外的配置
