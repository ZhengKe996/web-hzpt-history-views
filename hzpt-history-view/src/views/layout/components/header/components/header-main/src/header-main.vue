<template>
  <div class="w-full guide-search">
    <m-search
      v-model="inputValue"
      placeholder="搜索班级"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    ></m-search>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const inputValue = ref<string>('')
const onSearchHandler = (value: string) => {
  if (!value) return
  console.log(value)
}
</script>
