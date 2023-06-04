import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM, Category, Info } from '@/constants'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

export interface AppState {
  // 当前选中的分类
  currentCategory: Category
  themeType: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM
  currentGrade: string
  list: Info[]
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      currentCategory: ALL_CATEGORY_ITEM,
      themeType: THEME_LIGHT,
      currentGrade: '',
      list: [],
    }
  },
  getters: {
    getCurrentCategory(): Category {
      return this.currentCategory
    },
    getCurrentGrade(): string {
      return this.currentGrade
    },
    getThemeType():
      | typeof THEME_LIGHT
      | typeof THEME_DARK
      | typeof THEME_SYSTEM {
      return this.themeType
    },
    getList(): Info[] {
      return this.list
    },
  },
  actions: {
    changeCurrentCategory(newCategory: Category) {
      this.currentCategory = newCategory
    },
    changeCurrentGrade(newGrade: string) {
      this.currentGrade = newGrade
    },
    changeThemeType(
      newTheme: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM
    ) {
      this.themeType = newTheme
    },
    changeList(newList: Info[]) {
      this.list = newList
    },
    pushList(newList: Info[]) {
      this.list = [...newList]
    },
  },
})
