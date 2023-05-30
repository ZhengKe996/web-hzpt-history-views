<template>
  <div class="w-full">
    <el-form :model="form" label-width="120px">
      <el-form-item label="所属学院：">
        <el-input v-model="form.category" />
      </el-form-item>
      <el-form-item label="年级：">
        <el-input v-model="form.grade" />
      </el-form-item>
      <el-form-item label="班级名称：">
        <el-input v-model="form.classname" />
      </el-form-item>
      <el-form-item label="毕业照：">
        <!-- <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        > -->
        <img v-if="form.photo" :src="form.photo" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        <!-- </el-upload> -->
      </el-form-item>
      <el-form-item label="描述信息：">
        <el-input type="textarea" :rows="2" v-model="form.description" />
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
import { setInfoByOne } from '@/api'
import { Info } from '@/constants'
const router = useRouter()
const appStore = useAppStore()
const form = ref<Info>({
  category: '',
  grade: '',
  classname: '',
  description: '',
  photo: '',
  photoDownLink: '',
  photoWidth: 0,
  photoHeight: 0,
  photoType: '',
  panelimgurl: '',
})

const onSubmit = async () => {}
</script>

<style>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
