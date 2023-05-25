<template>
  <div>
    <el-row class="w-full">
      <el-col :span="4">
        <span class="block w-full mr-2 text-center">学院列表</span>
        <el-menu
          default-active="2"
          background-color="#ffffff20"
          text-color="#000000"
          active-text-color="#263C4E"
        >
          <el-sub-menu
            v-for="item of appStore.getIndexes"
            :index="item.category"
          >
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
      <el-col :span="20">
        <el-table
          :data="appStore.getInfos"
          size="large"
          stripe
          border
          class="w-full"
          @cell-click="rowClick"
        >
          <el-table-column prop="id" label="ID" align="center" width="80" />
          <el-table-column
            prop="category"
            label="学院"
            align="center"
            width="150"
          />
          <el-table-column
            prop="grade"
            label="年级"
            align="center"
            width="100"
          />
          <el-table-column
            prop="classname"
            label="班级"
            align="center"
            class="w-full"
          />

          <el-table-column label="Change" align="center" width="100">
            <el-button type="warning">修改</el-button>
          </el-table-column>
          <el-table-column label="Delete" align="center" width="100">
            <el-button type="danger">删除</el-button>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app'
const appStore = useAppStore()

const rowClick = (_: any, column: any) => {
  console.log('column--->', column.label)
}

const itemClick = (category: string, grade: number | string) => {
  console.log(category, grade)
}
</script>
