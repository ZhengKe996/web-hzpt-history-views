import { defineStore } from 'pinia'

import { Category, Info } from '@/constants'

import { getCategory, getInfoList, getIndexes, changeCategory } from '@/api'

export interface AppState {
  categorys: Category[]
  infoLists: Info[]
  indexes: { category: string; grades: any[] }[]
  changeCategory: Category
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      categorys: [],
      infoLists: [],
      indexes: [],
      changeCategory: {
        name: '',
        urlname: '',
      },
    }
  },
  getters: {
    /**
     * navigationBar 数据源
     */
    getCategorys(): Category[] {
      return this.categorys
    },
    getInfos(): Info[] {
      return this.infoLists
    },
    getIndexes(): any[] {
      return this.indexes
    },
    getChangeCategory(): Category {
      return this.changeCategory
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
    async useInfoData(query?: any) {
      const { data } = await getInfoList(query)
      this.setInfos(data)
    },
    setInfos(news: any[]) {
      this.infoLists = news
      console.log('useInfoData', this.infoLists)
    },
    async useIndexesData() {
      const { data } = await getIndexes()
      // console.log(data)
      this.setIndexes(data)
    },
    setIndexes(newList: any[]) {
      this.indexes = [...newList]
    },
    changeCategoryAction(category: Category) {
      this.changeCategory = category
    },
    changeCategoryInfo(category: Category) {
      this.changeCategory = category
      return changeCategory(category.id, category)
    },
  },
})
