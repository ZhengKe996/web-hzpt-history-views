import { defineStore } from 'pinia'

import { Category, Info } from '@/constants'

import { getCategory, getInfoList, getIndexes } from '@/api'

export interface AppState {
  categorys: Category[]
  infoLists: Info[]
  indexes: { category: string; grades: any[] }[]
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      categorys: [],
      infoLists: [],
      indexes: [],
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
    getIndexes(): any[] {
      return this.indexes
    },
  },
  actions: {
    async useCategoryData() {
      const { data } = await getCategory()
      // console.log(data)
      this.setCategorys(data)
    },
    setCategorys(newCategorys: any[]) {
      this.categorys = [...newCategorys]
    },
    async useInfoData() {
      const { data } = await getInfoList()
      // console.log(data)
      this.setInfos(data)
    },
    setInfos(news: any[]) {
      this.infoLists = [...news]
    },
    async useIndexesData() {
      const { data } = await getIndexes()
      // console.log(data)
      this.setIndexes(data)
    },
    setIndexes(newList: any[]) {
      this.indexes = [...newList]
    },
  },
})
