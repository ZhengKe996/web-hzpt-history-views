<template>
  <div class="w-f">
    <el-button type="primary" class="mb-3" @click="add">新增学院信息</el-button>
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
      <el-table-column label="Change" align="center" width="120">
        <el-button type="warning">修改</el-button>
      </el-table-column>
      <el-table-column label="Delete" align="center" width="120">
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { deleteCategory } from '@/api'
const appStore = useAppStore()
const router = useRouter()
const Delete = 'Delete'
const Change = 'Change'
const rowClick = (value: any, column: any) => {
  if (column.label == Delete) {
    ElMessageBox.confirm('是否删除此条记录', 'Warning', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const { success } = (await deleteCategory(value.id)) as any
      if (success) {
        ElMessage({
          type: 'success',
          message: '删除记录成功',
        })
        // 重新获取页面
        appStore.useCategoryData()
      }
    })
  } else if (column.label == Change) {
    appStore.changeCategoryAction(value)
    router.push({ path: 'change-category' })
  }
}

const add = () => router.push('add-category')
</script>
