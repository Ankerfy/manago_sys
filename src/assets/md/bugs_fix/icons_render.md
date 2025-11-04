你这个问题问得非常精准，而且触及了 **Vue 组件解析机制 + 构建工具 Tree-shaking 行为** 的核心差异！

我们来逐层拆解：

---

### ✅ 问题复述

你有两段代码：

#### 第一种（你的封装）

```vue
<IconButton :icon="isSidebarCollapse ? Expand : Fold" />
```

#### 第二种（Element Plus 官方写法）

```vue
<el-icon>
  <Fold v-if="!isSidebarCollapse" />
  <Expand v-else />
</el-icon>
```

两者都在 **没有手动 `import { Fold, Expand }`** 的前提下：

- ❌ 第一种 **不显示图标**（且控制台报 `icon: undefined`）
- ✅ 第二种 **能正常显示图标**

> 🤔 为什么？明明都全局注册了，为什么行为不一样？

---

### 🔍 根本原因：**Vue 对 `<component :is="...">` 和 `<直接组件标签>` 的处理方式不同**

#### ✅ 第二种写法：`<Fold />` 是 **静态组件标签**

当你写：

```vue
<Fold />
```

Vue 在编译模板时会：

1. **静态分析**：发现 `<Fold>` 是一个组件标签；
2. **自动去全局组件注册表中查找** 名为 `'Fold'` 的组件；
3. 如果你在 `main.js` 中注册过 `app.component('Fold', FoldIcon)`，就直接用它；
4. **不需要你在 `<script setup>` 中 `import Fold`**！

> ✅ 这就是为什么官方写法“不用 import 也能渲染”——因为 Vue 编译器会自动解析标签名并匹配全局组件。

---

#### ❌ 第一种写法：`:icon="Expand"` 是 **动态 JavaScript 表达式**

当你写：

```js
:icon="Expand"
```

这属于 **JavaScript 表达式上下文**，Vue 会：

1. 去当前组件的 `<script setup>` 作用域中查找变量 `Expand`；
2. 如果你 **没有 `import { Expand }`**，那么 `Expand === undefined`；
3. 于是你传给 `IconButton` 的是 `undefined`；
4. 即使 `IconButton` 内部用 `<component :is="icon" />`，`icon` 是 `undefined`，自然无法渲染。

> ❌ 关键点：**`Expand` 在这里是一个 JS 变量，不是模板标签！**

---

### 🧠 类比理解

| 写法           | 类型             | 是否依赖 JS 变量                | 是否依赖全局注册                        |
| -------------- | ---------------- | ------------------------------- | --------------------------------------- |
| `<Fold />`     | **模板静态标签** | ❌ 不需要                       | ✅ 需要（通过名称查找）                 |
| `:icon="Fold"` | **JS 表达式**    | ✅ 需要（必须定义 `Fold` 变量） | ❌ 不直接依赖（但变量值必须是组件对象） |

所以：

- `<Fold />` → Vue 编译器：「哦，这是个组件，去全局找叫 `Fold` 的」✅
- `:icon="Fold"` → JS 引擎：「`Fold` 是啥？没定义啊 → `undefined`」❌

---

### 🛠️ 验证方法

在你的组件中加一行：

```js
console.log('Expand:', Expand)
```

- 如果你 **没 import**，输出是 `undefined`；
- 如果你 **import 了**，输出是函数（组件对象）。

而 `<Fold />` 根本不会触发这个 `console.log`，因为它不依赖 JS 变量。

---

### ✅ 如何让第一种写法也“不用 import”？

有两条路：

#### 方案 A：改用字符串传入（推荐）

修改 `IconButton` 支持传字符串：

```vue
<!-- 使用 -->
<IconButton icon-name="Fold" />

<!-- IconButton.vue -->
<script setup>
defineProps({
  iconName: String,
})
</script>

<template>
  <el-icon>
    <component :is="iconName" />
  </el-icon>
</template>
```

这样：

- `iconName="Fold"` 是字符串；
- `<component :is="'Fold'">` 会去全局注册表找；
- ✅ 不需要 `import`！

> ⚠️ 但你要确保 `Fold` 确实被全局注册了（即至少有一个地方 import 了它，否则 tree-shaking 会删掉）。

---

#### 方案 B：强制保留图标（不推荐）

在 `main.js` 中“假引用”所有图标：

```js
// 防止 tree-shaking
const usedIcons = [Icons.Fold, Icons.Expand, Icons.RefreshRight]
console.log(usedIcons)
```

这样即使组件里不 import，图标也会被打包。

---

### ✅ 最佳实践建议

| 场景           | 推荐写法                                                                   |
| -------------- | -------------------------------------------------------------------------- |
| 简单使用图标   | ✅ 用 `<el-icon><Fold /></el-icon>`（官方方式）                            |
| 封装可复用按钮 | ✅ `IconButton` 接收 **字符串图标名**，内部用 `<component :is="iconName">` |
| 追求类型安全   | ✅ 手动 `import` 图标，传组件对象（适合 TS 项目）                          |

---

### 🎯 总结

| 为什么官方写法能用？   | 因为 `<Fold />` 是模板标签，Vue 自动从全局注册表解析 |
| ---------------------- | ---------------------------------------------------- |
| 为什么你的写法不能用？ | 因为 `Expand` 是 JS 变量，未 import → `undefined`    |
| 如何统一？             | 让 `IconButton` 接收字符串图标名，而不是组件对象     |

> ✅ **不是全局注册失效，而是两种写法触发的解析机制完全不同！**
