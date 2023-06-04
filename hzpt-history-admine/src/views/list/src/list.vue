<template>
  <div>
    <el-row class="w-full">
      <Menus :width="4" :indexes="appStore.getIndexes" @on-click="itemClick" />
      <el-col :span="20">
        <el-button type="primary" class="mb-2" @click="add">
          新增毕业照信息
        </el-button>
        <el-button type="warning" class="mb-2" @click="addAll">
          批量新增信息
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
          <el-table-column align="center" label="毕业照">
            <template #default="scope">
              <div class="w-16 h-8 m-0 p-0 mx-auto">
                <img v-preview :src="scope.row.photo" />
              </div>
            </template>
          </el-table-column>

          <el-table-column align="center" label="名单">
            <template #default="scope">
              <div class="w-16 h-8 m-0 p-0 mx-auto">
                <img v-preview :src="scope.row.panelimgurl" />
              </div>
            </template>
          </el-table-column>
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
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { deleteInfoByone } from '@/api'
import { useRouter } from 'vue-router'
import Menus from '../components/menus'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const currentCategory = ref<string>('')
const currentGrade = ref<string | number>('')
const appStore = useAppStore()
const Delete = 'Delete'
const Change = 'Change'
const state = ref({
  page: 1,
  limit: 10,
  total: appStore.getInfos.length,
})

/**
 * 构建数据请求
 */
let query = {}
/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = async (newQuery: any) => {
  query = { ...query, ...newQuery }
  appStore.useInfoData(query)
  appStore.useIndexesData()
}

const rowClick = (value: any, column: any) => {
  if (column.label == Delete) {
    ElMessageBox.confirm('是否删除此条记录', 'Warning', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const { success } = (await deleteInfoByone(value.id)) as any
      if (success) {
        ElMessage({
          type: 'success',
          message: 'Delete completed',
        })
        // 重新获取页面
        resetQuery(query)
      }
    })
  } else if (column.label == Change) {
    console.log(Change)
    appStore.changeInfoAction(value)
    router.push({ path: 'change-info' })
  }
}

const itemClick = (category: string, grade: number | string) => {
  currentCategory.value = category
  currentGrade.value = grade
}

watch([currentCategory, currentGrade], (_) => {
  // 重置请求参数
  resetQuery({
    category: currentCategory.value,
    grade: currentGrade.value,
  })
})

watch(
  () => appStore.getInfos,
  (value: any[]) => {
    state.value.total = value.length
  }
)

//前端限制分页（tableData为当前展示页表格）
const tableData = () => {
  return appStore.getInfos.filter(
    (_, index) =>
      index < state.value.page * state.value.limit &&
      index >= state.value.limit * (state.value.page - 1)
  )
}

//改变页码
const handleCurrentChange = (e: any) => {
  state.value.page = e
}
//改变页数限制
const handleSizeChange = (e: any) => {
  state.value.limit = e
}

const add = () => router.push('add-info')
const addAll = () => router.push('add-info-list')
</script>
