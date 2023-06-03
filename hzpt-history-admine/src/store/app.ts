import { defineStore } from 'pinia'

import { Category, Info } from '@/constants'

import {
  getCategory,
  getInfoList,
  getIndexes,
  changeCategory,
  changeInfoByOne,
} from '@/api'

export interface AppState {
  categorys: Category[]
  infoLists: Info[]
  indexes: { category: string; grades: any[] }[]
  changeCategory: Category
  changeInfo: Info
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
      },
      changeInfo: {
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
    getChangeInfo(): Info {
      return this.changeInfo
    },
  },
  actions: {
    async useCategoryData() {
      const { data } = await getCategory()
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
    },
    async useIndexesData() {
      const { data } = await getIndexes()
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
    changeInfoAction(info: Info) {
      this.changeInfo = info
    },
    changeCurrentInfo(info: Info) {
      this.changeInfo = info
      return changeInfoByOne(info.id, info)
    },
  },
})
