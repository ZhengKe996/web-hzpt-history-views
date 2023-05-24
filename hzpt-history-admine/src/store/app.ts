import { defineStore } from 'pinia'

import { Category, Info } from '@/constants'

import { getCategory, getInfoList } from '@/api'

export interface AppState {
  categorys: Category[]
  infoLists: Info[]
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      categorys: [],
      infoLists: [],
    }
  },
  getters: {
    /**
     * navigationBar 数据源
     */
    getCategorys(): any[] {
      return this.categorys
    },
    getInfos(): any[] {
      return this.infoLists
    },
  },
  actions: {
    async useCategoryData() {
      const { data } = await getCategory()
      console.log(data)
      this.setCategorys(data)
    },
    setCategorys(newCategorys: any[]) {
      this.categorys = [...newCategorys]
    },
    async useInfoData() {
      const { data } = await getInfoList()
      console.log(data)
      this.setInfos(data)
    },
    setInfos(news: any[]) {
      this.infoLists = [...news]
    },
  },
})
