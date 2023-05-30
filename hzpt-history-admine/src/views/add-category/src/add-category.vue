<template>
  <div class="w-full">
    <el-form :model="form" label-width="120px">
      <el-form-item label="学院名称：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="英文缩写：">
        <el-input v-model="form.urlname" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { setCategory } from '@/api'
import { Category } from '@/constants'
const router = useRouter()
const appStore = useAppStore()
const form = ref<Category>({ name: '', urlname: '' })

const onSubmit = async () => {
  const res = await setCategory(form.value)
  if ((res as any)?.success) {
    ElMessage({
      message: '新增学院成功',
      type: 'success',
    })
    appStore.useCategoryData()
    router.back()
  } else {
    ElMessage({
      message: '失败，请检查网络',
      type: 'warning',
    })
  }
}
</script>
