<template>
  <div class="w-full">
    <el-button type="primary" class="mb-3" @click="add">新增一行</el-button>
    <el-button type="warning" class="mb-3" @click="remove">删除一行</el-button>

    <el-form :model="state" label-width="100px">
      <div
        v-for="item of state"
        class="my-2 border-b border-zinc-200 border-dashed shadow-sm"
      >
        <el-form-item class="my-auto" label="学院名称：">
          <el-input v-model="item.category" />
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Category } from '@/constants'
import { setCategorys } from '@/api'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'

const router = useRouter()
const appStore = useAppStore()
const state = ref<Category[]>([{ category: '' }])
const onSubmit = async () => {
  if (state.value.length > 1) {
    const res = await setCategorys(state.value)
    if ((res as any)?.success) {
      ElMessage({
        message: '新增学院成功',
        type: 'success',
      })
      setTimeout(() => {
        appStore.useCategoryData()
        router.back()
      }, 1000)
    } else {
      ElMessage({
        message: '失败，请检查网络',
        type: 'warning',
      })
    }
  }
}
// 新增行
const add = () => state.value.push({ category: '' })

// 删除最后一行
const remove = () => {
  if (state.value.length > 1) state.value.pop()
}
</script>
