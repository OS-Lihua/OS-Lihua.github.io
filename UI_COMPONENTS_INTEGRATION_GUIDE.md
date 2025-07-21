# UI 组件库集成指南

本文档说明了如何在 Astro + TailwindCSS + Preact 项目中使用已集成的 UI 组件库。

## 已集成的组件库

### 1. shadcn/ui
- **用途**: 现代化的 UI 组件库，提供一致的设计系统
- **特点**: 完全可定制、支持暗色模式、TypeScript 类型安全
- **组件位置**: `src/components/ui/`
- **工具函数**: `src/lib/utils.ts`

### 2. React Bits
- **用途**: 提供精美动画效果的现代 React 组件
- **特点**: 基于 framer-motion、即插即用、高性能动画
- **组件位置**: `src/components/react-bits/`
- **主要依赖**: framer-motion

### 3. Spline 3D
- **用途**: 集成交互式 3D 场景
- **特点**: 无需 3D 编程知识、可视化编辑器、Web 优化
- **组件位置**: `src/components/spline/`
- **主要依赖**: @splinetool/react-spline

## 安装的依赖项

```json
{
  "dependencies": {
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-icons": "^1.3.2",
    "lucide-preact": "^0.525.0",
    "framer-motion": "^12.23.6",
    "@preact/compat": "^18.3.1",
    "@splinetool/react-spline": "^4.1.0",
    "@splinetool/runtime": "^1.10.33",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## 配置文件

### TailwindCSS 配置
- 添加了 shadcn/ui 的颜色系统
- 集成了 CSS 变量支持
- 包含了动画插件

### Astro 配置
- 优化了依赖预构建
- 添加了新的依赖项到 optimizeDeps

### CSS 变量
- 在 `src/styles/theme.css` 中添加了 shadcn/ui 的 CSS 变量
- 支持亮色和暗色模式

## 使用示例

### shadcn/ui 按钮组件

```astro
---
import { Button } from '../components/ui/button';
---

<Button client:load>点击我</Button>
<Button variant="outline" size="lg" client:load>大轮廓按钮</Button>
```

### React Bits 动画组件

```astro
---
import { AnimatedCard } from '../components/react-bits/animated-card';
---

<AnimatedCard delay={0.2} client:load>
  <h3>动画卡片标题</h3>
  <p>这是一个带有动画效果的卡片</p>
</AnimatedCard>
```

### Spline 3D 组件

```astro
---
import { ClientOnlySpline } from '../components/spline/ClientOnlySpline';
---

<ClientOnlySpline
  scene="https://prod.spline.design/your-scene-url"
  className="w-full h-[500px]"
  client:only="preact"
/>
```

## 重要注意事项

### 客户端指令
- 所有 React/Preact 组件都需要客户端指令（如 `client:load`、`client:visible`）
- **对于 Spline 3D 组件，必须使用 `client:only="preact"`** 以避免 SSR 问题
- 推荐使用 `ClientOnlySpline` 组件而不是 `SplineScene`

### 性能优化
- Spline 3D 组件使用 `client:only="preact"` 仅在客户端渲染
- 动画组件可以设置延迟以创建序列效果
- 大型组件库按需导入

### 兼容性
- 所有组件都通过 @preact/compat 确保与 Preact 兼容
- framer-motion 和 Radix UI 组件正常工作

## 演示页面

访问 `/ui-components-demo` 查看所有组件的实际效果和使用示例。

## 下一步

1. 根据需要从 shadcn/ui 添加更多组件
2. 从 React Bits 网站复制更多动画组件
3. 在 Spline 中创建自定义 3D 场景
4. 根据项目需求自定义主题和样式

## 故障排除

### 常见问题
1. **组件不显示**: 确保添加了正确的客户端指令
2. **样式不正确**: 检查 TailwindCSS 配置和 CSS 变量
3. **3D 场景不加载**: 验证 Spline 场景 URL 是否正确且可访问
4. **动画不工作**: 确保 framer-motion 正确安装并配置

### 调试建议
- 检查浏览器控制台的错误信息
- 验证所有依赖项都已正确安装
- 确保 Astro 配置中的 optimizeDeps 包含所需的包
