**为什么在 `unplugin-auto-import` 的配置中要加入：**

```ts
imports: ['vue', 'vue-router', 'pinia']
```

---

#### ✅ 简短回答

> **这行配置的作用是：当在 `.vue` 文件或 `.ts` 文件中，无需手动 `import`，就能直接使用 Vue、Vue Router、Pinia 的常用 API（如 `ref`, `computed`, `defineComponent`, `useRouter`, `defineStore` 等）**。

它实现了 **API 的自动导入**，极大提升开发效率，减少样板代码。

---

#### 🧩 详细解释

##### 1. `imports: ['vue']` —— 自动导入 Vue 3 Composition API

With `imports: ['vue']`:

```ts
<script setup>
// 不需要 import！可以直接使用 ref, computed 等
const count = ref(0)
const doubled = computed(() => count.value * 2)

onMounted(() => {
  console.log('Mounted!')
})
</script>
```

✅ `unplugin-auto-import` 会自动注入，所有常用的 Vue Composition API 都可以直接使用：

```ts
import { ref, computed, reactive, onMounted, defineComponent, ... } from 'vue'
```

---

##### 2. `imports: ['vue-router']` —— 自动导入路由相关 API

With `imports: ['vue-router']`:

```ts
// 直接使用，无需 import
const router = useRouter()
const route = useRoute()
```

✅ 常用的 API 包括：

- `useRouter`
- `useRoute`
- `useLink`（较少用）

---

##### 3. `imports: ['pinia']` —— 自动导入 Pinia 状态管理 API

With `imports: ['pinia']`:

```ts
// 直接使用 defineStore，无需 import
const useUserStore = defineStore('user', { ... })
```

✅ 自动导入：

- `defineStore`
- `acceptHMRUpdate`
- `mapStores`, `mapState` 等（可选）

---

#### 🎯 实际效果：减少样板代码，提升开发体验

| 场景               | 以前                                     | 现在                              |
| ------------------ | ---------------------------------------- | --------------------------------- |
| 使用 `ref`         | `import { ref } from 'vue'`              | 直接写 `ref(0)`                   |
| 使用 `useRouter`   | `import { useRouter } from 'vue-router'` | 直接写 `useRouter()`              |
| 使用 `defineStore` | `import { defineStore } from 'pinia'`    | 直接写 `defineStore('user', ...)` |

> 💡 这就是现代 Vue 开发中“**零导入**”（zero-import）体验的核心之一。

---

#### 🛠 配合 `dts: 'src/auto-imports.d.ts'` 生成类型声明

当你配置了：

```ts
AutoImport({
  imports: ['vue', 'vue-router', 'pinia'],
  dts: 'src/auto-imports.d.ts', // 生成类型声明文件
})
```

插件会自动生成一个 `.d.ts` 文件，告诉 TypeScript：

> “这些变量是全局可用的，不要报错！”

这样你在 VS Code 中也能获得完整的 **类型提示、自动补全、跳转定义** 等功能。

---

#### 📦 内部原理简述

`unplugin-auto-import` 是一个 **Vite/Rollup 插件**，它在构建时扫描你的代码，发现你使用了 `ref`、`useRouter` 等未声明的变量，就会：

1. 自动插入对应的 `import` 语句
2. 或者（在 `<script setup>` 中）确保这些 API 被正确注入

它不会影响运行时性能，只是开发时的“语法糖”增强。

#### ✅ 是否必须配置？

| 你是否想…                              | 是否需要配置                            |
| -------------------------------------- | --------------------------------------- |
| 每次都手动 `import { ref } from 'vue'` | ❌ 不需要                               |
| 实现“零导入”开发体验                   | ✅ **强烈推荐配置**                     |
| 使用 Volar 的模板自动补全              | ✅ 推荐配置（配合 `vueTemplate: true`） |

#### ✅ 最佳实践建议

```ts
AutoImport({
  imports: [
    'vue',
    'vue-router',
    'pinia',
    // 可选：其他常用工具
    '@vueuse/core', // 如果你用了 VueUse
  ],
  resolvers: [
    // 图标、组件解析器等
  ],
  dts: 'src/auto-imports.d.ts', // 生成类型声明
  vueTemplate: true, // 支持在 template 中使用（如 v-model）
})
```

---

#### ✅ 总结

| 配置项         | 作用                                                   |
| -------------- | ------------------------------------------------------ |
| `'vue'`        | 自动导入 `ref`, `computed`, `reactive`, `onMounted` 等 |
| `'vue-router'` | 自动导入 `useRouter`, `useRoute`                       |
| `'pinia'`      | 自动导入 `defineStore`, `acceptHMRUpdate`              |
| `dts`          | 生成类型声明，支持 TS 类型提示                         |
| `vueTemplate`  | 支持在模板中使用自动导入的变量                         |

> 🔥 这就是现代 Vue 3 项目高效开发的“三大利器”之一：
>
> 1. `unplugin-auto-import` → 自动导入 API
> 2. `unplugin-vue-components` → 自动导入组件
> 3. `unplugin-icons` → 自动导入图标

三者结合，真正实现 **零配置导入，极致开发体验**。
