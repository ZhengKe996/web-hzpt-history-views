import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM, Category, CATEGORY_NOMAR_DATA } from '@/constants'
import { getCategory } from '@/api/category'
import { useAppStore } from './app'
const appStore = useAppStore()
/**
 * @description CategoryState 类型 (pinia)
 */
export interface CategoryState {
  categorys: Category[]
}

export const useCategorysStore = defineStore({
  id: 'categorys',
  state: (): CategoryState => {
    return {
      categorys: CATEGORY_NOMAR_DATA,
    }
  },
  getters: {
    /**
     * navigationBar 数据源
     */
    getCategorys(): any[] {
      return this.categorys
    },
    getGrades(): string[] {
      let grades: string[] = []
      this.getCategorys.findIndex((item: Category) => {
        if (item.category === appStore.currentCategory.category) {
          grades = item.grades
        }
      })
      return grades
    },
    getCurrentCategoryIndex(): number {
      return this.getCategorys.findIndex((item: Category) => {
        return item.category === appStore.currentCategory.category
      })
    },
  },
  actions: {
    async useCategoryData() {
      const { data } = await getCategory()
      this.setCategorys(data)
    },
    setCategorys(newCategorys: any[]) {
      this.categorys = [ALL_CATEGORY_ITEM, ...newCategorys]
    },
  },
})
