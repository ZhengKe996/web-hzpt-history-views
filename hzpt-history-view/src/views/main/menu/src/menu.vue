<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
      所有分类
    </h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="item in grades"
        :key="item.id"
        class="text-lg text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duration-100 active:bg-zinc-100 active:dark:bg-zinc-900"
        @click="$emit('onItemClick', item)"
      >
        {{ item.grade }}级
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Grade } from '@/constants'
defineProps<{ grades: Grade[] }>()
</script>
