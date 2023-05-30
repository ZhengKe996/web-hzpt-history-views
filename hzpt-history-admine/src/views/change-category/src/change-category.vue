<template>
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
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { Category } from '@/constants'
const router = useRouter()
const form = ref<Category>({ id: '', name: '', urlname: '' })

const appStore = useAppStore()
onMounted(() => {
  form.value = appStore.getChangeCategory
})

const onSubmit = async () => {
  const res = await appStore.changeCategoryInfo(form.value)
  if ((res as any)?.success) {
    ElMessage({
      message: '修改学院信息成功',
      type: 'success',
    })
    router.back()
  } else {
    ElMessage({
      message: '更新学院信息失败，请检查网络',
      type: 'warning',
    })
  }
}
</script>
