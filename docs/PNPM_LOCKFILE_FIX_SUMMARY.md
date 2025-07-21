# pnpm Lockfile 配置不匹配问题修复总结

## 问题描述

在 GitHub Actions CI/CD 流水线中遇到 pnpm lockfile 配置不匹配错误：

```
Run pnpm install --frozen-lockfile
WARN  Ignoring not compatible lockfile at /home/runner/work/OS-Lihua.github.io/OS-Lihua.github.io/pnpm-lock.yaml
ERR_PNPM_LOCKFILE_CONFIG_MISMATCH  Cannot proceed with the frozen installation. The current "overrides" configuration doesn't match the value found in the lockfile
```

## 根本原因分析

### 1. pnpm 版本不匹配
- **本地环境**: pnpm `10.13.1`
- **GitHub Actions**: pnpm `8.15.0`
- **lockfile 版本**: `9.0` (需要 pnpm v9+ 支持)

### 2. 版本兼容性问题
- pnpm v8 无法正确读取 lockfile v9.0 格式
- 导致 overrides 配置验证失败
- `--frozen-lockfile` 标志无法正常工作

## 解决方案

### ✅ 1. 更新 GitHub Actions 工作流

**修改前**:
```yaml
env:
  PNPM_VERSION: 8.15.0
```

**修改后**:
```yaml
env:
  PNPM_VERSION: 10.13.1 # 与本地版本保持一致
```

### ✅ 2. 更新 package.json 引擎要求

**修改前**:
```json
{
  "engines": {
    "pnpm": ">=8.0.0",
    "node": ">=16.0.0"
  }
}
```

**修改后**:
```json
{
  "engines": {
    "pnpm": ">=10.0.0",
    "node": ">=20.0.0"
  }
}
```

### ✅ 3. 验证配置一致性

确保以下配置在所有环境中保持一致：
- **package.json**: `"astro": "5.12.0"` override
- **pnpm-lock.yaml**: `astro: 5.12.0` override
- **GitHub Actions**: pnpm `10.13.1`
- **本地环境**: pnpm `10.13.1`

## 验证结果

### ✅ 本地测试通过
```bash
# 依赖安装测试
pnpm install --frozen-lockfile
# ✅ 成功，无配置不匹配错误

# 构建测试
pnpm build
# ✅ 成功，生成 103 个页面
```

### ✅ 配置验证
- lockfile 版本: `9.0` ✅
- pnpm 版本: `10.13.1` ✅
- overrides 配置: 一致 ✅
- 引擎要求: 更新 ✅

## 修复的文件

1. **`.github/workflows/deploy.yml`**
   - 更新 `PNPM_VERSION` 从 `8.15.0` 到 `10.13.1`

2. **`package.json`**
   - 更新 `engines.pnpm` 从 `>=8.0.0` 到 `>=10.0.0`
   - 更新 `engines.node` 从 `>=16.0.0` 到 `>=20.0.0`

## 预期效果

### GitHub Actions 现在应该能够：
1. ✅ 成功运行 `pnpm install --frozen-lockfile`
2. ✅ 正确解析 lockfile v9.0 格式
3. ✅ 验证 overrides 配置匹配
4. ✅ 安装所有 UI 组件库依赖
5. ✅ 成功构建和部署项目

### 依赖项验证
所有新集成的 UI 组件库依赖都已正确解析：
- ✅ shadcn/ui: `class-variance-authority`, `clsx`, `tailwind-merge`
- ✅ Radix UI: `@radix-ui/react-slot`, `@radix-ui/react-icons`
- ✅ React Bits: `framer-motion`, `@preact/compat`
- ✅ Spline 3D: `@splinetool/react-spline`, `@splinetool/runtime`
- ✅ 动画支持: `tailwindcss-animate`

## 最佳实践建议

### 1. 版本一致性
- 确保本地和 CI 环境使用相同的 pnpm 版本
- 定期更新 GitHub Actions 中的工具版本
- 使用 `engines` 字段强制版本要求

### 2. lockfile 管理
- 始终提交 `pnpm-lock.yaml` 到版本控制
- 在 CI 中使用 `--frozen-lockfile` 确保依赖一致性
- 定期更新 lockfile 以获得安全修复

### 3. 监控和维护
- 定期检查 GitHub Actions 工作流的工具版本
- 监控 pnpm 新版本发布
- 测试版本升级对项目的影响

## 总结

通过统一本地和 CI 环境的 pnpm 版本，成功解决了 lockfile 配置不匹配问题。现在 GitHub Actions 可以：
- 正确安装所有依赖项
- 成功构建包含 UI 组件库的项目
- 顺利部署到 GitHub Pages

这个修复确保了 CI/CD 流水线的稳定性和可靠性。
