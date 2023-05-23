<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type as keyof typeof typeEnum],
      sizeEnum[sizeKey  as keyof typeof sizeEnum].button,
      { 'active:scale-105': isActiveAnim },
    ]"
    @click.stop="onBtnClick"
  >
    <!-- 展示 loading -->
    <m-svg-icon
      v-if="loading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></m-svg-icon>

    <!-- icon 按钮 -->
    <m-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey as keyof typeof sizeEnum].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></m-svg-icon>

    <!-- 文字按钮 -->
    <slot v-else />
  </button>
</template>

<script lang="ts">
// type 可选项：表示按钮风格
const typeEnum = {
  primary:
    'text-white  bg-zinc-800 dark:bg-zinc-900  hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
  main: 'text-white  bg-main dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700',
}
// size 可选项：表示按钮大小。区分文字按钮和icon按钮
const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: '',
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5',
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: '',
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5',
  },
}

const EMITS_CLICK = 'click'
</script>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    icon: string
    iconColor: string
    iconClass: string
    type: 'primary' | 'main' | 'info'
    size: 'default' | 'icon-default' | 'small' | 'icon-small'
    isActiveAnim: boolean
    loading: boolean
  }>(),
  { type: 'main', size: 'default', isActiveAnim: true, loading: false }
)

const emits = defineEmits([EMITS_CLICK])

/**
 * 处理大小的 key 值
 */
const sizeKey = computed(() => {
  return props.icon ? 'icon-' + props.size : props.size
})

/**
 * 按钮点击事件处理
 */
const onBtnClick = () => {
  if (props.loading) {
    return
  }
  emits(EMITS_CLICK)
}
</script>
