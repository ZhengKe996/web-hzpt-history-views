<template>
  <div
    class="bg-white dark:bg-zinc-800 duration-500 sticky top-0 left-0 w-full z-10"
  >
    <ul
      class="w-[1280px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto h-[56px]"
    >
      <!-- category item -->
      <li
        v-for="(item, index) in categorysStore.getCategorys"
        :key="item.id"
        class="shrink-0 px-1 py-0 z-10 duration-200 last:mr-4 text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        :class="{
          'text-zinc-900 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-900':
            categorysStore.getCurrentCategoryIndex === index,
        }"
        @click="onItemClick(item)"
      >
        {{ item.category }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCategorysStore } from '@/store/category'
import { useAppStore } from '@/store/app'
import { Category } from '@/constants'
const categorysStore = useCategorysStore()
const appStore = useAppStore()

const onItemClick = (item: Category) => appStore.changeCurrentCategory(item)
</script>
