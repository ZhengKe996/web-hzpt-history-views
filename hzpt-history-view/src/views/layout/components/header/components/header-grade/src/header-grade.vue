<template>
  <m-popover v-if="categorysStore.getGrades.length > 0">
    <template #reference>
      <m-svg-icon
        name="down-arrow"
        class="guide-theme w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></m-svg-icon>
    </template>

    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
        v-for="item in categorysStore.getGrades"
        :key="item"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          name="search"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-300 text-sm"
          >{{ item }}级</span
        >
      </div>
    </div>
  </m-popover>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
import { useCategorysStore } from '@/store/category'

const appStore = useAppStore()
const categorysStore = useCategorysStore()
console.log(categorysStore.getGrades.length > 0)
const onItemClick = (item: string) => appStore.changeCurrentGrade(item)
</script>
