<template>
  <div class="bg-white sticky top-0 left-0 z-10 dark:bg-zinc-900 duration-500">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
        @click="isOpenPopup = !isOpenPopup"
      >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"></m-svg-icon>
      </li>

      <!-- items -->
      <li
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          ' text-zinc-100': categorysStore.getCurrentCategoryIndex === index,
        }"
        v-for="(item, index) in categorysStore.categorys"
        :key="item.category"
        :ref="setItemRef"
        @click="onItemClick(item)"
      >
        {{ item.category }}
      </li>
    </ul>

    <m-popup v-model="isOpenPopup">
      <MobileMenu
        :grades="categorysStore.getGrades"
        @onItemClick="onItemClick2"
      />
    </m-popup>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUpdate, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { Category } from '@/constants'
import { useCategorysStore } from '@/store/category'
import { useAppStore } from '@/store/app'
import MobileMenu from '@/views/main/menu'

const appStore = useAppStore()
const categorysStore = useCategorysStore()

// 滑块
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px',
})

const onItemClick = (item: Category) => appStore.changeCurrentCategory(item)

const onItemClick2 = (item: string) => appStore.changeCurrentGrade(item)

onBeforeUpdate(() => {
  itemRefs = []
})

// 获取所有的 item
let itemRefs: any[] = []
const setItemRef = (el: any) => {
  if (el) {
    itemRefs.push(el)
  }
}

// 获取 ul 元素，以计算偏移位置
const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)

// watch 监听
watch(
  () => categorysStore.getCurrentCategoryIndex,
  (val) => {
    // 获取选中元素的 left、width
    const { left, width } = itemRefs[val].getBoundingClientRect()

    // 为 sliderStyle 设置属性
    sliderStyle.value = {
      // ul 横向滚动位置 + 当前元素的 left 偏移量
      transform: `translateX(${ulScrollLeft.value + left - 10 + 'px'})`,
      width: width + 'px',
    }
  }
)

// 是否显示 Popup
const isOpenPopup = ref(false)
</script>
