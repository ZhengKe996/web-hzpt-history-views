<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <Pins :id="($route.params.id as string)" />
  </div>
</template>

<script setup lang="ts">
import Pins from '../components/pins'
</script>
