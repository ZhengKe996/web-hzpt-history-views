<template>
  <div>
    <m-infinite
      v-model="loading"
      :isFinished="isFinished"
      @onLoad="getInfoData"
    >
      <m-waterfall
        class="px-1 w-full"
        :data="infolList"
        nodeKey="id"
        :column="isMobileTerminal ? 2 : 5"
        :picturePreReading="false"
      >
        <template v-slot="{ item, width }">
          <ListItem :info="item" :width="width" @click="onToPins" />
        </template>
      </m-waterfall>

      <!-- 大图详情处理 -->
      <transition
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
      >
        <PinsComponent v-if="isVisiblePins" :id="currentPins.id" />
      </transition>
    </m-infinite>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import gsap from 'gsap'
import { useAppStore } from '@/store/app'
import ListItem from './list-item.vue'
import { getInfoList } from '@/api/list'
import { Info } from '@/constants'
import { isMobileTerminal } from '@/utils/flexible'
import PinsComponent from '@/views/pins/components/pins'
const appStore = useAppStore()

/**
 * 构建数据请求
 */
let query = {
  page: 1,
  size: 20,
}

// 数据是否加载中
const loading = ref<boolean>(false)

// 数据是否全部加载完成
const isFinished = ref<boolean>(false)

const infolList = ref<Info[]>([])
const getInfoData = async () => {
  // 数据全部加载完 return
  if (isFinished.value) return

  // 完成了第一次请求后，后续的请求让page自增
  if (infolList.value.length > 0) {
    query.page += 1
  }

  // 触发接口
  const { data } = await getInfoList(query)

  if (query.page === 1) {
    infolList.value = data
    appStore.changeList(data)
  } else {
    infolList.value.push(...data)
    appStore.pushList(data)
  }

  // 判断数据是否全部加载完成
  if (data.length <= 0) {
    isFinished.value = true
  }

  // 修改 loading 标记
  loading.value = false
}

/**
 * 通过此方法修改 query 请求参数，重新发起请求
 */
const resetQuery = (newQuery: any) => {
  query = { ...query, ...newQuery }
  // 重置状态
  isFinished.value = false
  loading.value = true
}

/**
 * 监听 currentCategory 的变化
 */
watch(
  () => appStore.getCurrentCategory,
  (currentCategory) => {
    infolList.value = []
    appStore.changeList([])
    // 重置请求参数
    if (currentCategory.category == '全部') {
      resetQuery({
        page: 1,
        category: '',
      })
    } else {
      resetQuery({
        page: 1,
        category: currentCategory.category,
      })
    }
  }
)

/**
 * 监听 currentGrade 的变化
 */
watch(
  () => appStore.getCurrentGrade,
  (currentGrade) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      grade: currentGrade.grade,
    })
  }
)

// 控制 pins 展示
const isVisiblePins = ref<boolean>(false)

// 当前选中的 pins 属性
const currentPins = ref<any>({})

/**
 * 进入 pins
 */
const onToPins = (item: {
  id: string
  localtion: { translateX: number; translateY: number }
}) => {
  history.pushState(null, '', `/pins/${item.id}`)
  currentPins.value = item
  isVisiblePins.value = true
}

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
  isVisiblePins.value = false
})

/**
 * 进入动画开始前
 */
const beforeEnter = (el: Element) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    translateX: currentPins.value.localtion?.translateX,
    translateY: currentPins.value.localtion?.translateY,
    opacity: 0,
  })
}
/**
 * 进入动画执行中
 */
const enter = (el: Element, done: any) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    onComplete: done,
  })
}
/**
 * 离开动画执行中
 */
const leave = (el: Element) => {
  gsap.to(el, {
    duration: 0.3,
    scaleX: 0,
    scaleY: 0,
    x: currentPins.value.localtion?.translateX,
    y: currentPins.value.localtion?.translateY,
    opacity: 0,
  })
}
</script>
