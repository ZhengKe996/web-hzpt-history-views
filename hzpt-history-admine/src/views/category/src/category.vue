<template>
  <div class="w-full my-2">
    <el-button type="primary" class="mb-3" @click="add">新增学院信息</el-button>
    <el-button type="warning" class="mb-3" @click="addAll">
      批量新增学院
    </el-button>
    <el-table
      :data="tableData()"
      size="large"
      stripe
      border
      class="w-full"
      @cell-click="rowClick"
    >
      <el-table-column prop="id" label="ID" align="center" width="80" />
      <el-table-column
        prop="category"
        label="Name"
        align="center"
        class="w-full"
      />
      <el-table-column label="Change" align="center" width="120">
        <el-button type="warning">修改</el-button>
      </el-table-column>
      <el-table-column label="Delete" align="center" width="120">
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>
    <div class="my-2">
      <el-pagination
        :hide-on-single-page="true"
        background
        :page-size="10"
        :page-sizes="[10]"
        layout="prev, pager, next ,total,sizes"
        :total="state.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
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

const state = ref({
  page: 1,
  limit: 10,
  total: appStore.getCategorys.length,
})
//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  return appStore.getCategorys.filter(
    (_, index) =>
      index < state.value.page * state.value.limit &&
      index >= state.value.limit * (state.value.page - 1)
  )
}

watch(
  () => appStore.getCategorys,
  (value: any[]) => {
    state.value.total = value.length
  }
)
//改变页码
const handleCurrentChange = (e: any) => {
  state.value.page = e
}
//改变页数限制
const handleSizeChange = (e: any) => {
  state.value.limit = e
}

const add = () => router.push('add-category')
const addAll = () => router.push('add-category-list')
</script>
