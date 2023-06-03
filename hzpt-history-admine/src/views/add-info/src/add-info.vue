<template>
  <div class="w-full">
    <el-form :model="form" label-width="120px">
      <el-form-item label="毕业照：">
        <el-upload
          class="avatar-uploader"
          :action="'api/set/upload-image'"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeImageUpload"
        >
          <img v-if="form.photo" :src="form.photo" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="所属学院：">
        <el-cascader v-model="form.category" :options="cascaders">
        </el-cascader>
      </el-form-item>
      <el-form-item label="年级：">
        <el-input v-model="form.grade" />
      </el-form-item>
      <el-form-item label="班级名称：">
        <el-input v-model="form.classname" />
      </el-form-item>
      <el-form-item label="描述信息：">
        <el-input type="textarea" :rows="2" v-model="form.description" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button type="warning" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store/app'
import { setInfoByOne } from '@/api'
import { Info } from '@/constants'

const appStore = useAppStore()
const form = ref<Info>({
  id: 0,
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
const onClear = () => {
  form.value = {
    id: 0,
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
  }
}
const onSubmit = async () => {
  if (
    form.value.classname &&
    form.value.classname &&
    form.value.grade &&
    form.value.photo
  ) {
    const res = await setInfoByOne(form.value)
    if ((res as any)?.success) {
      ElMessage({
        message: '新增学院成功',
        type: 'success',
      })
      setTimeout(() => {
        appStore.useInfoData()
        appStore.useCategoryData()
        appStore.useIndexesData()
      }, 500)
    } else {
      ElMessage({
        message: '失败，请检查网络',
        type: 'warning',
      })
    }
  } else {
    ElMessage.error({
      message: '错误，请检查输入不能为空',
    })
  }
}

const handleSuccess = (response: any, file: any) => {
  if (response.success) {
    form.value.photo = `/${response.data.imgUrl}`
    form.value.photoDownLink = `/${response.data.imgUrl}`
    form.value.description = file.name.split('.')[0]
    form.value.classname = file.name.split('.')[0]
    if (file.name.match(/\d+(\.\d+)?/g) != null) {
      form.value.grade = `20${file.name.match(/\d+(\.\d+)?/g)[0].slice(0, 2)}`
    }
    ElMessage({
      message: '图片上传成功',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '失败，请检查网络',
      type: 'warning',
    })
  }
}

const beforeImageUpload = (rawFile: any) => {
  if (rawFile.type == 'image/jpeg') {
    let reader = new FileReader()
    reader.onload = function (event: any) {
      let txt = event.target.result
      let img = document.createElement('img')
      img.src = txt
      img.onload = function () {
        form.value.photoWidth = img.width
        form.value.photoHeight = img.height
      }
    }
    reader.readAsDataURL(rawFile)
  }
}
let cascaders = ref<any[]>([])
onMounted(() => {
  appStore.getCategorys.forEach((item) => {
    cascaders.value.push({ value: item.name, label: item.name })
  })
})
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
