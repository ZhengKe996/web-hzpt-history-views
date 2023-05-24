<template>
  <div>
    <el-table
      :data="appStore.getCategorys"
      size="large"
      stripe
      border
      class="w-full"
      @cell-click="rowClick"
    >
      <el-table-column prop="id" label="ID" align="center" width="80" />
      <el-table-column prop="name" label="Name" align="center" class="w-full" />
      <el-table-column label="Change" align="center" width="180">
        <div>xxx</div>
      </el-table-column>
      <el-table-column label="Delete" align="center" width="180">
        <div>---</div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'

const appStore = useAppStore()

onMounted(() => appStore.useCategoryData())

const rowClick = (row: any, column: any) => {
  console.log('row--->', row.label)
  console.log('column--->', column.label)
  // console.log('cell--->', cell)
  // console.log('event--->', event)
}
</script>
