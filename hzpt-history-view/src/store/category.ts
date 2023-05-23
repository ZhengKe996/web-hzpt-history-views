import { defineStore } from 'pinia'
import {
  ALL_CATEGORY_ITEM,
  Category,
  Grade,
  CATEGORY_NOMAR_DATA,
} from '@/constants'
import { getCategory, getGrade } from '@/api/category'
import { useAppStore } from './app'
const appStore = useAppStore()
/**
 * @description CategoryState 类型 (pinia)
 */
export interface CategoryState {
  categorys: Category[]
  grades: Grade[]
}

export const useCategorysStore = defineStore({
  id: 'categorys',
  state: (): CategoryState => {
    return {
      categorys: CATEGORY_NOMAR_DATA,
      grades: [],
    }
  },
  getters: {
    /**
     * navigationBar 数据源
     */
    getCategorys(): any[] {
      return this.categorys
    },
    getGrades(): Grade[] {
      return this.grades
    },
    getCurrentCategoryIndex(): number {
      return this.getCategorys.findIndex((item: Category) => {
        return item.urlname === appStore.currentCategory.urlname
      })
    },
  },
  actions: {
    async useCategoryData() {
      const { data } = await getCategory()
      this.setCategorys(data)
    },
    async useGradeData() {
      const { data } = await getGrade()
      this.setGrades(data)
    },
    setCategorys(newCategorys: any[]) {
      this.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    },
    setGrades(grades: any[]) {
      this.grades = [...grades]
    },
  },
})
