<template>
  <div class="w-full my-3">
    <el-carousel
      :interval="4000"
      type="card"
      indicator-position="none"
      autoplay
      height="500px"
    >
      <el-carousel-item v-for="item in appStore.getList" :key="item">
        <img
          v-lazy
          v-preview
          class="h-full"
          v-if="item.photo"
          :src="item.photo"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
</script>
