搜索框集成到 Vue 项目中，并使用 Element Plus 的图标，我们可以创建一个 Vue 组件来实现这一功能。下面是如何封装的步骤。

### 1. 创建 Vue 组件

首先，创建一个新的 Vue 组件文件，比如 `SearchBox.vue`。

```vue
<script setup>
import { Search } from '@element-plus/icons-vue'
import { defineEmits } from 'vue'

// 定义点击事件
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="search-box" @click="handleClick">
    <el-icon :size="16">
      <Search />
    </el-icon>
    <span class="search-p">搜索</span>
    <span class="search-h-k">Ctrl + K</span>
  </div>
</template>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  gap: 8px;
  background-color: #e6e6ff;
  border: 1px solid #d0c4ff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.search-box:hover {
  background-color: #d8d8ff;
  transform: translateY(-1px);
}

.search-box > .el-icon {
  color: #9981fa;
}

.search-p {
  color: #333;
  font-size: 14px;
}

.search-h-k {
  background-color: #f0f0ff;
  border: 1px solid #d0c4ff;
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 12px;
  color: #666;
  margin-left: 8px;
}
</style>
```

### 2. 在父组件中使用

接下来，在你想要展示该搜索框的地方引入并使用这个组件。例如，在 `App.vue` 中：

```vue
<template>
  <div id="app">
    <!-- 其他代码 -->
    <SearchBox @click="onSearchClick" />
    <!-- 其他代码 -->
  </div>
</template>

<script setup>
import SearchBox from './components/SearchBox.vue'

const onSearchClick = () => {
  console.log('搜索被点击了')
  // 可以在这里添加搜索逻辑
}
</script>
```
