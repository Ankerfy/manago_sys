<!-- @/components/UserAvatarPopover.vue -->
<script lang="ts" setup>
import { useSreenSize } from '@/composables/useSreenSize'

const { isMdOrLarger } = useSreenSize()

// 定义合法的avatarSize值
type AvatarSize = 'small' | 'default' | 'large' | number

const props = defineProps({
  avatarUrl: {
    type: String,
    required: true,
  },
  avatarSize: {
    type: [Number, String] as PropType<string | number>,
    default: 32,
  },
  width: {
    type: Number,
    default: 300,
  },
  userName: {
    type: String,
    default: '个人简介',
  },
  userMention: {
    type: String,
    default: '@Anker-fy',
  },
  description: {
    type: String,
    default:
      'People experience sorrow and joy, parting and reunion, the moon waxes and wanes, brightens and dims.',
  },
})

// 转换并规范avatarSize值
const normalizedAvatarSize = computed(() => {
  const vaildSizes = ['small', 'default', 'large']
  if (typeof props.avatarSize === 'string' && vaildSizes.includes(props.avatarSize)) {
    return props.avatarSize as AvatarSize
  }
  const num = parseInt(String(props.avatarSize), 10)
  return isNaN(num) ? 32 : num
})

const popperStyle = computed(() => ({
  boxShadow: 'rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px',
  padding: '15px',
}))
</script>

<template>
  <!-- :disabled="!isMdOrLarger" -->
  <el-popover v-if="isMdOrLarger" :width="width" :popper-style="popperStyle" trigger="click">
    <template #reference>
      <el-avatar :size="normalizedAvatarSize" :src="avatarUrl" />
    </template>

    <div class="flex flex-col gap-4 font-mono md:font-serif antialiased">
      <el-avatar :size="60" :src="avatarUrl" class="mb-0.5!" />
      <!-- 用户简介 -->
      <div>
        <p class="m-0 text-base font-medium">{{ userName }}</p>
        <p class="m-0 text-sm text-gray-500">{{ userMention }}</p>
      </div>
      <p class="m-0 text-gray-600">{{ description }}</p>
    </div>
  </el-popover>

  <div v-else>
    <el-avatar :size="normalizedAvatarSize" :src="avatarUrl" class="mt-1.5!" />
  </div>
</template>