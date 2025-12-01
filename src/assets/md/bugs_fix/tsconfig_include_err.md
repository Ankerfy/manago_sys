你遇到的错误：

```
error TS6905: Output file 'vite.config.d.ts' has not been built from source file 'vite.config.ts'.
The file is in the program because:
Matched by include pattern 'vite.config.ts' in 'tsconfig.json'
```

这是 **`vue-tsc`** 的一个常见问题，原因是：  
👉 `vue-tsc` 试图为 `vite.config.ts` 生成 `.d.ts` 声明文件（用于类型检查），但 **它无法正确处理 Vite 配置文件的特殊结构**，尤其是当 `vite.config.ts` 被 `tsconfig.json` 的 `include` 包含时。

---

#### ✅ 错误原因分析

- `tsconfig.json` 中的 `"include": ["src/**/*", "vite.config.ts"]` 将 `vite.config.ts` 加入了编译范围
- `vue-tsc` 在运行时会尝试为所有 `.ts` 文件生成 `.d.ts`，包括 `vite.config.ts`
- 但 `vite.config.ts` 是 **Node.js 环境下的配置文件**，其语法和模块系统与前端源码不同，导致生成失败
- 最终报错：`Output file ... has not been built from source file`

> ⚠️ 这不是代码错误，而是 TypeScript 编译器对“非前端”文件的处理逻辑冲突。

---

#### ✅ 解决方案：**修改 `tsconfig.json` 的 `include` 和 `exclude`**

##### ✅ 正确做法：**不要将 `vite.config.ts` 放在主 `tsconfig.json` 的 `include` 中**

因为 `vite.config.ts` 应该由 `tsconfig.node.json` 来管理，而不是主配置。

---

##### 🔧 修改前（错误）

```json
"include": ["src/**/*", "vite.config.ts"]
```

##### ✅ 修改后（正确）

```json
"include": ["src/**/*"],
"exclude": ["node_modules", "dist", "vite.config.ts"]
```

同时确保你的 `tsconfig.node.json` 已存在并包含 `vite.config.ts`：

```json
// tsconfig.node.json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

> ✅ 这样做后：
>
> - 主 `tsconfig.json` 不再处理 `vite.config.ts`
> - `vue-tsc` 不会尝试为其生成 `.d.ts`
> - `vite.config.ts` 由 `tsconfig.node.json` 单独管理，避免冲突

---

#### ✅ 补充建议

##### 1. 确保 `vite.config.ts` 没有被误引入到前端代码中

例如：

```ts
// ❌ 不要这样写
import { defineConfig } from 'vite'
// ...
```

这会导致 `vite.config.ts` 被当作前端模块，引发混淆。

✅ 正确做法：只在 `vite.config.ts` 中使用 `defineConfig`，不要在其他地方导入。

---

##### 2. 使用 `vue-tsc --noEmit` 时，可临时忽略此错误

如果你只是想检查前端代码类型，可以：

```bash
# 忽略 vite.config.ts 的类型检查
vue-tsc --noEmit --project ./tsconfig.json --exclude vite.config.ts
```

但推荐还是按上面方法修复 `tsconfig.json`。

---

#### ✅ 最终验证

运行：

```bash
pnpm type-check
```

应无报错，且能正常检查 `src/` 下的所有 `.ts` 文件。

#### ✅ 总结

| 问题                          | 解决方法                                                  |
| ----------------------------- | --------------------------------------------------------- |
| `vue-tsc` 报 `TS6905` 错误    | 从主 `tsconfig.json` 的 `include` 中移除 `vite.config.ts` |
| `vite.config.ts` 类型未被检查 | 用 `tsconfig.node.json` 单独管理                          |
| 构建失败                      | 修复 `tsconfig.json` 后重新运行                           |

##### ✅ 推荐最终 `tsconfig.json` 配置片段

```json
"include": ["src/**/*"],
"exclude": ["node_modules", "dist", "vite.config.ts"],
"references": [{ "path": "./tsconfig.node.json" }]
```

> ✅ 完成后，`vue-tsc --noEmit` 就不会再报这个错误了！

---

你遇到的问题是：

> **`找不到模块 "unplugin-auto-import/vite" 或其相应的类型声明。ts(2307)`**

这说明：**你的 `vite.config.ts` 中导入了 `unplugin-auto-import`，但 TypeScript 无法找到它的类型定义**。

---

#### 🔍 错误原因分析

虽然你在 `package.json` 中安装了 `unplugin-auto-import`，但：

1. **`unplugin-auto-import` 的类型定义（`.d.ts`）可能未正确发布或未被加载**
2. **Vite 插件的类型声明通常在 `node_modules/unplugin-auto-import/dist/types` 下，但 TS 没有识别到**
3. **`unplugin-auto-import` 在某些版本中需要额外配置才能支持 `vite.config.ts` 的类型检查**

---

#### ✅ 解决方案

##### ✅ 方案一：升级 `unplugin-auto-import` 到最新版本（推荐）

```bash
pnpm add -D unplugin-auto-import@latest
```

> ✅ 最新版（如 `v0.14+`）已修复类型声明问题，支持 `vite.config.ts` 的类型检查。

###### 验证是否支持

- 打开 `node_modules/unplugin-auto-import/dist/types/index.d.ts`
- 看是否有导出 `AutoImport` 类型

---

##### ✅ 方案二：手动添加类型声明（临时解决）

如果暂时不能升级，可以在项目根目录创建一个 `types/vite-plugin.d.ts` 文件：

```ts
// types/vite-plugin.d.ts
declare module 'unplugin-auto-import/vite' {
  import { Plugin } from 'vite'
  const AutoImport: Plugin
  export default AutoImport
}
```

然后在 `tsconfig.json` 中引入：

```json
{
  "include": ["src/**/*", "types/**/*"]
}
```

这样 TS 就能“假装”它找到了这个模块的类型。

---

##### ✅ 方案三：关闭该文件的类型检查（不推荐，仅调试用）

在 `vite.config.ts` 顶部加注释：

```ts
// @ts-nocheck
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' // 这里会报错
```

> ⚠️ 只用于快速测试，正式项目不要用。

---

##### ✅ 方案四：使用 `@vitejs/plugin-vue` 的 `autoImport` 功能替代（高级）

如果你只是想自动导入 Vue 组件、Pinia、Router 等，可以考虑使用 `unplugin-auto-import` 的替代品：

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
  ],
})
```

> ✅ 这些插件都提供良好的类型支持。

---

#### 🧪 验证是否修复

运行：

```bash
pnpm type-check
```

应不再报 `TS2307` 错误。

#### 总结

| 问题                                     | 原因                      | 解决方法                                   |
| ---------------------------------------- | ------------------------- | ------------------------------------------ |
| `找不到模块 "unplugin-auto-import/vite"` | 类型声明缺失或版本过旧    | 升级插件到最新版                           |
| `ts(2307)` 报错                          | TS 无法解析 Vite 插件类型 | 添加 `types/vite-plugin.d.ts` 或升级       |
| VS Code 提示错误                         | 编辑器依赖 TS 类型        | 确保 `@types/node` 和 `@types/vite` 已安装 |

##### ✅ 推荐操作顺序

1. **升级 `unplugin-auto-import`**：

   ```bash
   pnpm add -D unplugin-auto-import@latest
   ```

2. **重启 VS Code / 重新打开项目**

3. **运行 `pnpm type-check`**，确认无报错

4. **如有其他插件报错（如 `unplugin-icons`），也按同样方式处理**
