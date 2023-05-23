<template>
  <MobileNavigation v-if="isMobileTerminal" />
  <PCNavigation v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import MobileNavigation from './mobile'
import PCNavigation from './pc'
import { useCategorysStore } from '@/store/category'

const categorysStore = useCategorysStore()

onMounted(() => {
  categorysStore.useCategoryData()
  categorysStore.useGradeData()
})
</script>
