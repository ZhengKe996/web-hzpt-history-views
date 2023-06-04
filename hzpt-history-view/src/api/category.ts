import Service from '@/utils/request'

/**
 *
 * @returns 获取学院列表
 */
export const getCategory = () => {
  return Service({ url: '/indexes' })
}

/**
 *
 * @returns 获取年级列表
 */
export const getGrade = () => {
  return Service({ url: '/grade' })
}
