<template>
  <div
    class="w-full duration-500 bg-white border-b-2 dark:bg-zinc-800 border-b-gary-100 dark:border-b-zinc-700 px-2 pt-1"
  >
    <div class="flex items-center">
      <img
        v-lazy
        class="h-5 cursor-pointer guide-home"
        :src="LogoSM"
        @click="onToHome"
      />
      <Navigation class="mr-1" />
      <HeaderGrade class="mr-1" />
      <HeaderTheme class="mr-1" :theme-arr="ThemeArray" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LogoSM, ThemeArray } from '@/constants'
import { useRouter } from 'vue-router'
import HeaderTheme from '../components/header-theme'
import Navigation from '../components/navigation'
import HeaderGrade from '../components/header-grade'

const router = useRouter()
const onToHome = () => {
  router.push('/')
}
</script>
