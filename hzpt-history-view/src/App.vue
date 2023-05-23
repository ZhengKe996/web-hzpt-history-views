<script lang="ts" setup name="main">
import { watch } from 'vue'
import { useAppStore } from '@/store/app'

import { changeTheme } from '@/utils/theme'

const appStore = useAppStore()

// 初始化主题
watch(
  () => appStore.getThemeType,
  (value) => {
    changeTheme(value)
  },
  { immediate: true }
)
</script>

<template>
  <div class="h-screen fixed top-0 left-0 w-screen">
    <RouterView />
  </div>
</template>
