# Spline 3D 组件

这个目录包含用于集成 Spline 3D 场景的组件。

## 组件说明

### ClientOnlySpline (推荐)
专为客户端渲染设计的 Spline 组件，解决了 SSR 兼容性问题。

### SplineScene
通用的 Spline 场景组件，支持服务器端渲染。

## 使用方法

### 1. 基本使用 (推荐)

```tsx
import { ClientOnlySpline } from '../components/spline/ClientOnlySpline';

// 在 Astro 组件中使用
<ClientOnlySpline
  scene="https://prod.spline.design/your-scene-url"
  client:only="preact"
/>
```

### 2. 在 Astro 页面中使用

```astro
---
import { ClientOnlySpline } from '../components/spline/ClientOnlySpline';
---

<div class="w-full h-screen">
  <ClientOnlySpline
    scene="https://prod.spline.design/your-scene-url"
    className="w-full h-full"
    client:only="preact"
  />
</div>
```

### 3. 自定义加载状态

```tsx
<ClientOnlySpline
  scene="https://prod.spline.design/your-scene-url"
  fallback={<div>自定义加载中...</div>}
  onLoad={() => console.log('场景已加载')}
  onError={(error) => console.error('加载失败:', error)}
  client:only="preact"
/>
```

## 获取 Spline 场景 URL

1. 在 [Spline](https://spline.design) 中创建你的 3D 场景
2. 点击右上角的 "Export" 按钮
3. 选择 "Code" 选项
4. 选择 "React" 框架
5. 复制提供的场景 URL

## 性能优化建议

- 使用 `client:only="preact"` 确保组件仅在客户端渲染
- 为复杂场景设置合适的 fallback 组件
- 考虑在移动设备上使用简化版本的场景
- 使用 `ClientOnlySpline` 组件避免 SSR 问题

## 重要注意事项

### SSR 兼容性
- **必须使用** `client:only="preact"` 指令，不要使用 `client:load` 或 `client:visible`
- 推荐使用 `ClientOnlySpline` 组件，它专门为客户端渲染设计
- Spline 组件在服务器端渲染时会导致构建失败

### 其他注意事项
- Spline 场景需要网络连接才能加载
- 3D 场景可能会消耗较多的 GPU 资源
- 确保场景 URL 是公开可访问的
- 组件会自动处理加载状态和错误情况
