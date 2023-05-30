<template>
  <el-col :span="width">
    <span class="block w-full mr-2 text-center">学院列表</span>
    <el-menu
      default-active="2"
      background-color="#ffffff20"
      text-color="#000000"
      active-text-color="#263C4E"
    >
      <el-sub-menu v-for="item of indexes" :index="item.category">
        <template #title>
          <span>{{ item.category }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="i of item.grades"
            @click="itemClick(item.category, i)"
          >
            {{ i }}级</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-col>
</template>

<script setup lang="ts">
defineProps<{ width: number; indexes: any[] }>()
const emits = defineEmits(['onClick'])

const itemClick = (category: any, grade: any) => {
  emits('onClick', category, grade)
}
</script>
