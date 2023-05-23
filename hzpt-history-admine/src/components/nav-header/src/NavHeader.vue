<template>
  <el-page-header :content="props.detail" />
</template>

<script setup lang="ts">
const props = defineProps({
  detail: String,
})
</script>
