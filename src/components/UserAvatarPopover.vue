<!-- @/components/UserAvatarPopover.vue -->
<template>
  <el-popover :width="width" :popper-style="popperStyle" trigger="hover">
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

const popperStyle = computed(() => ({
  boxShadow: 'rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px',
  padding: '20px',
}))
</script>

<style scoped>
.user-avatar-popover__content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-avatar-popover__big-avatar {
  margin-bottom: 2px;
}

.user-avatar-popover__name {
  margin: 0;
  font-weight: 500;
  font-size: 16px;
}

.user-avatar-popover__mention {
  margin: 0;
  font-size: 14px;
  color: var(--el-color-info);
}

.user-avatar-popover__desc {
  margin: 0;
  line-height: 1.5;
}
</style>