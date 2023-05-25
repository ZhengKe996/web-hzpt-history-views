<template>
  <div class="basic-layout">
    <div class="nav-side">
      <NavMenu />
    </div>
    <div class="content-right">
      <div class="nav-top">
        <div class="bread"></div>
        <div class="user-info"></div>
      </div>
      <div class="wrapper">
        <div class="main-page">
          <el-row>
            <el-col :span="24">
              <router-view />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import NavMenu from './components/nav-menu'

const appStore = useAppStore()

onMounted(() => {
  appStore.useCategoryData()
  appStore.useInfoData()
  appStore.useIndexesData()
})
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;

  .nav-side {
    position: fixed;
    width: 240px;
    height: 100vh;
    background-color: #0c2135;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
  }
  .content-right {
    margin-left: 240px;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
    }

    .wrapper {
      background: #eef0f3;

      padding: 20px;
      height: calc(100vh - 50px);
      .main-page {
        background-color: #fff;
        background-image: url('@/assets/images/login-bg.svg');
        height: 100%;
        padding: 40px;
      }
    }
  }
}
</style>
