import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM, Category, Grade, ALL_Grade_ITEM } from '@/constants'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

export interface AppState {
  // 当前选中的分类
  currentCategory: Category
  themeType: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM
  currentGrade: Grade
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => {
    return {
      currentCategory: ALL_CATEGORY_ITEM,
      themeType: THEME_LIGHT,
      currentGrade: ALL_Grade_ITEM,
    }
  },
  getters: {
    getCurrentCategory(): Category {
      return this.currentCategory
    },
    getCurrentGrade(): Grade {
      return this.currentGrade
    },
    getThemeType():
      | typeof THEME_LIGHT
      | typeof THEME_DARK
      | typeof THEME_SYSTEM {
      return this.themeType
    },
  },
  actions: {
    changeCurrentCategory(newCategory: Category) {
      this.currentCategory = newCategory
    },
    changeCurrentGrade(newGrade: Grade) {
      this.currentGrade = newGrade
    },
    changeThemeType(
      newTheme: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM
    ) {
      this.themeType = newTheme
    },
  },
})
