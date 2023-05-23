<template>
  <div class="nav-menu h-full bg-[#2B66B1]">
    <div class="logo">
      <img class="img" src="~@/assets/logo.png" alt="logo" />
      <span class="title">毕业照留念</span>
    </div>
    <el-menu
      background-color="#2B66B1"
      text-color="#FFFFFF"
      active-text-color="#263C4E"
      unique-opened
      :default-active="defaultActive"
      :router="true"
    >
      <el-menu-item index="/category">
        <el-icon><Position /></el-icon>
        <span>学院列表</span>
      </el-menu-item>
      <el-menu-item index="/">
        <el-icon><View /></el-icon>
        <span>照片列表</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const defaultActive = ref(route.path)
</script>

<style lang="scss" scoped>
.nav-menu {
  .logo {
    display: flex;
    height: 78px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 6px;
    }

    .title {
      font-size: 20px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-right: none;
  }
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #3572b5 !important;
  }
}
</style>
