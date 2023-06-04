<template>
  <div class="w-full my-2">
    <el-button type="primary" class="mb-3" @click="add">新增一行</el-button>
    <el-button type="warning" class="mb-3" @click="remove">删除一行</el-button>

    <el-form :model="state" label-width="100px">
      <div
        v-for="(item, index) of state"
        class="my-2 p-4 border border-zinc-200 border-dashed shadow-sm"
      >
        <el-statistic class="m-2" title="毕业照信息" :value="index + 1" />
        <div class="flex">
          <div class="flex-auto flex">
            <el-form-item label="毕业照：">
              <el-upload
                class="avatar-uploader"
                :action="'api/set/upload-image'"
                :show-file-list="false"
                :on-success="handleSuccess"
                :data="{ id: index }"
              >
                <img v-if="item.photo" :src="item.photo" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>

            <el-form-item label="名单：">
              <el-upload
                class="avatar-uploader"
                :action="'api/set/upload-image'"
                :show-file-list="false"
                :on-success="handleRollSuccess"
                :data="{ id: index }"
              >
                <img v-if="item.photo" :src="item.photo" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </el-form-item>
          </div>

          <div class="flex-auto">
            <el-form-item label="所属学院：">
              <el-cascader v-model="item.category" :options="cascaders">
              </el-cascader>
            </el-form-item>

            <el-form-item label="年级：">
              <el-input v-model="item.grade" />
            </el-form-item>
          </div>
          <div class="flex-auto">
            <el-form-item label="班级名称：">
              <el-input v-model="item.classname" />
            </el-form-item>

            <el-form-item label="描述信息：">
              <el-input type="textarea" :rows="2" v-model="item.description" />
            </el-form-item>
          </div>
        </div>
      </div>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">新增</el-button>
        <el-button type="danger" @click="onClear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store/app'
import { setInfoByList } from '@/api'
import { Info } from '@/constants'

const appStore = useAppStore()
const state = ref<Info[]>([
  {
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
  },
])

const handleSuccess = (response: any, file: any) => {
  if (response.success) {
    const index = response.data.index
    state.value[index].photo = `/${response.data.imgUrl}`
    state.value[index].photoDownLink = `/${response.data.imgUrl}`
    state.value[index].description = file.name.split('.')[0]
    state.value[index].classname = file.name.split('.')[0]
    if (file.name.match(/\d+(\.\d+)?/g) != null) {
      state.value[index].grade = `20${file.name
        .match(/\d+(\.\d+)?/g)[0]
        .slice(0, 2)}`
    }

    if (file.raw.type == 'image/jpeg') {
      let reader = new FileReader()
      reader.onload = function (event: any) {
        let txt = event.target.result
        let img = document.createElement('img')
        img.src = txt
        img.onload = function () {
          console.log('width', img.width, 'height', img.height)
          state.value[index].photoWidth = img.width
          state.value[index].photoHeight = img.height
          state.value[index].photoType = file.raw.type
        }
      }
      reader.readAsDataURL(file.raw)
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

const handleRollSuccess = (response: any) => {
  if (response.success) {
    state.value[response.data.index].panelimgurl = `/${response.data.imgUrl}`
    ElMessage({
      message: '名单上传成功',
      type: 'success',
    })
  } else {
    ElMessage({
      message: '失败，请检查网络',
      type: 'warning',
    })
  }
}

const onSubmit = async () => {
  let isNull = false
  state.value.forEach(async (item) => {
    if (!item.category && !item.classname && !item.grade && !item.photo) {
      isNull = true
    }
  })

  if (isNull) {
    ElMessage.error({
      message: '失败，请检查是否有空项',
    })
    return
  }
  const res = await setInfoByList(state.value)
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
}
const onClear = () =>
  (state.value = [
    {
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
    },
  ])
// 新增行
const add = () =>
  state.value.push({
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

// 删除最后一行
const remove = () => {
  if (state.value.length > 1) state.value.pop()
}

// 学院
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
