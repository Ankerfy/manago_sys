感谢你提供完整的 `UserAvatarPopover.vue` 代码！

```vue
<!-- @/components/UserAvatarPopover.vue -->
<template>
  <el-popover :width="width" :popper-style="popperStyle" trigger="click">
    <template #reference>
      <el-avatar :size="avatarSize" :src="avatarUrl" />
    </template>

    <div class="user-avatar-popover__content">
      <el-avatar :size="60" :src="avatarUrl" class="user-avatar-popover__big-avatar" />
      <div class="user-avatar-popover__info">
        <p class="user-avatar-popover__name">{{ userName }}</p>
        <p class="user-avatar-popover__mention">{{ userMention }}</p>
      </div>
      <p class="user-avatar-popover__desc">{{ description }}</p>
    </div>
  </el-popover>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  avatarUrl: {
    type: String,
    required: true,
  },
  avatarSize: {
    type: [Number, String],
    default: 32,
  },
  ...
})
...
</script>

<style scoped>
...
</style>
```

#### ✅ 结论先行

**组件代码本身没有任何问题**，也没有定义 `validator`，所以 **不应该出现如下警告**：

```
[Vue warn]: Invalid prop: custom validator check failed for prop "size".
```

⚠️ **这个错误不是来自 `UserAvatarPopover` 组件**，而是来自 **使用该组件的地方**

---

#### 🔍 错误根源分析

在父组件中写法：

```html
<UserAvatarPopover avatar-url="..." size="32" />
```

但注意：子组件接收的是 **`avatarSize`**，而不是 `size`！

而 `<el-avatar>` 内部确实有一个叫 `size` 的 prop，并且它有严格的校验规则（只接受 `'large' | 'default' | 'small'` 或特定数字）。

所以 Vue 的警告其实是 **Element Plus 的 `el-avatar` 组件报的**，因为你可能把 `size` 直接传给了 `<UserAvatarPopover>`，而它又透传（或误用）给了 `<el-avatar>`？

例如：

```html
<UserAvatarPopover
  avatar-url="https://..."
  size="32"   <!-- ❌ 多余的、未定义的 prop -->
/>
```

虽然你没有在 `defineProps` 中声明 `size`，但 Vue 默认会把**未声明的 prop 自动透传（fallthrough）** 到根元素（这里是 `<el-popover>`）。

而 `<el-popover>` 可能又把 `size` 透传给内部的某些子组件（比如 `el-avatar`？不太可能），或者更可能的是：

> **你同时用了 `<el-avatar>` 和 `<UserAvatarPopover>`，并在某处直接给 `<el-avatar>` 传了非法的 `size` 值！**

---

#### ✅ 最终真相

**在某个地方直接使用了 `<el-avatar>`**，并写了：

```html
<el-avatar size="32" :src="..." />
```

但 Element Plus 的 `el-avatar` 对 `size` prop 的校验规则是：

- 如果是 **字符串**，只能是 `'large'`、`'default'`、`'small'`
- 如果是 **数字**，必须是合法数字（如 40、50 等）

但注意：**`size="32"` 是字符串 `"32"`，不是数字 `32`！**

而 `el-avatar` 的 validator 可能不接受字符串形式的数字！

👉 查看 Element Plus 源码（[ElAvatar props](https://github.com/element-plus/element-plus/blob/dev/packages/components/avatar/src/avatar.ts)）：

```ts
size: {
  type: [Number, String],
  validator: (val: unknown): val is AvatarSize => {
    return (
      isNumber(val) ||
      ['large', 'default', 'small'].includes(val as string)
    )
  },
}
```

✅ 它其实**允许数字**，也允许那三个字符串。

所以 `size="32"`（字符串）**会被拒绝**，因为 `"32"` 不在 `['large','default','small']` 中，也不是数字。

---

#### ✅ 解决方案

##### ✔️ 如果是直接使用 `<el-avatar>`

```html
<!-- ❌ 错误：字符串 "32" 不被允许 -->
<el-avatar size="32" />

<!-- ✅ 正确：用 v-bind 传数字 -->
<el-avatar :size="32" />
```

#### ✔️ 如果是通过 `<UserAvatarPopover>` 使用

确保你传的是 `avatar-size`，并且用绑定语法：

```html
<!-- ✅ 正确 -->
<UserAvatarPopover avatar-url="https://..." :avatar-size="32" />
```

不要写成：

```html
<!-- ❌ 错误：size 是 el-avatar 的 prop，不是你的组件的 -->
<UserAvatarPopover avatar-url="..." size="32" />
或
<!-- ❌ 虽然 prop 名对，但传的是字符串 -->
<UserAvatarPopover avatar-url="..." avatar-size="32" />
```

---

#### 🔧 额外建议：禁用 prop 透传（可选）

如果不想让外部传入的未知 prop（如 `size`）透传到 `<el-popover>`，可以在组件上加 `inheritAttrs: false`：

```js
<script setup>
// ...
</script>

<script>
export default {
  inheritAttrs: false,
}
</script>
```

或在 `<script setup>` 中使用 `useAttrs()` 显式控制。

但这不是必须的，只要不乱传 `size` 就行。

#### ✅ 总结

| 问题                                                                      | 原因                               | 修复                     |
| ------------------------------------------------------------------------- | ---------------------------------- | ------------------------ |
| `[Vue warn]: Invalid prop: custom validator check failed for prop "size"` | 给 `<el-avatar>` 传了字符串 `"32"` | 改为 `:size="32"`        |
| 在 `<UserAvatarPopover>` 上写 `size="32"`                                 | 透传导致干扰                       | 改为 `:avatar-size="32"` |

现在只需要检查**所有使用头像的地方**即可，确保：

- 直接用 `<el-avatar>` 时：`:size="32"`
- 用 `<UserAvatarPopover>` 时：`:avatar-size="32"`

---

---

上述内容解析，在 Vue 官方文档中，这一机制通常被称为：
**"prop fallthrough"** 或 **"attribute fallthrough"**（<span style="color: red; font-weight: 700;">组件透传</span>）

#### ✅ **Fallthrough Attributes**（透传属性）

这是 Vue 3 中的标准术语。指的是：  
当一个组件没有显式声明某个 prop 时，该属性会“透传”到组件的根元素上（或通过 `$attrs` 手动控制）。

##### 相关概念说明

- **Fallthrough attributes** 包括：
  - 未被 `props` 声明的 attribute（如 `class`、`style`、`id`、自定义属性等）
  - 事件监听器（如 `@click`），除非被显式处理

- 默认行为：Vue 自动将这些 attributes 应用到组件的**根 DOM 元素**上。

- 可通过 `inheritAttrs: false` 禁用自动透传。

- 可通过 `$attrs` 在模板或脚本中手动访问和控制透传内容。

##### 示例

```vue
<!-- Parent.vue -->
<CustomInput id="my-input" class="custom-class" data-test="123" />

<!-- CustomInput.vue -->
<template>
  <!-- 默认情况下，id/class/data-test 会透传到 input 上 -->
  <input v-bind="$attrs" />
</template>

<script setup>
// 没有声明 id/class/data-test 为 props
</script>
```

这里 `id`、`class`、`data-test` 就是 **fallthrough attributes**。

#### 总结

| 中文                | 英文                       |
| ------------------- | -------------------------- |
| 透传属性 / 组件透传 | **Fallthrough Attributes** |
| 属性透传机制        | **Attribute Fallthrough**  |
| 禁用透传            | `inheritAttrs: false`      |

这是 Vue 官方文档使用的标准术语，推荐在技术交流或文档中使用 **"fallthrough attributes"**。
