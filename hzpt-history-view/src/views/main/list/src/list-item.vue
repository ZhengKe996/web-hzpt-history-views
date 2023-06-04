<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
    <div
      class="relative w-full rounded cursor-zoom-in group"
      :style="{
        backgroundColor: randomRGB(),
      }"
      @click="onToPinsClick"
    >
      <!-- 图片 -->
      <img
        v-lazy
        ref="imgTarget"
        class="w-full rounded bg-transparent"
        :src="`http://127.0.0.1:7001${info.photo}`"
        :style="{
          height: (width! / info.photoWidth) * info.photoHeight + 'px',
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>

        <!-- 点赞 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-button>

        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          icon="download"
          size="small"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        ></m-button>

        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="full"
          size="small"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        ></m-button>
      </div>
    </div>
    <!-- 标题 -->
    <p class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">
      {{ info.classname }}
    </p>
    <!-- 作者 -->
    <div class="flex items-center mt-1 px-1">
      <span class="text-sm text-zinc-500 ml-1">{{ info.category }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFullscreen, useElementBounding } from '@vueuse/core'
import { saveAs } from 'file-saver'
import { Info } from '@/constants'
import { randomRGB } from '@/utils/color'
import { message } from '@/libs'

const { info } = defineProps<{ info: Info; width?: number }>()
const emits = defineEmits(['click'])
const imgTarget = ref<HTMLImageElement>()

/**
 * pins 跳转处理，记录图片的中心点（X|Y位置 + 宽|高的一半）
 */
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidth,
  height: imgContainerHeight,
} = useElementBounding(imgTarget)

const imgContainerCenter = computed(() => {
  return {
    translateX: Math.floor(imgContainerX.value + imgContainerWidth.value / 2),
    translateY: Math.floor(imgContainerY.value + imgContainerHeight.value / 2),
  }
})

/**
 * 进入详情点击事件
 */
const onToPinsClick = () => {
  emits('click', {
    id: info.id,
    localtion: imgContainerCenter.value,
  })
}

/**
 * 生成全屏方法
 */
const { enter: onImgFullScreen } = useFullscreen(imgTarget)

/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  // 提示消息
  message('success', '图片开始下载')
  /**
   * 接收两个参数：
   * 1. 下载的图片链接
   * 2. 下载的文件名称
   */
  setTimeout(() => {
    saveAs(info.photoDownLink, `${info.classname}`)
  }, 300)
}
</script>
