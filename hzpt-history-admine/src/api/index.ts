import Service from '@/utils/request'

/**
 *
 * @returns 获取学院列表
 */
export const getCategory = () => {
  return Service({ url: '/get/category' })
}

/**
 *
 * @returns 设置学院列表
 */
export const setCategory = () => {
  return Service({ method: 'POST', url: '/set/category' })
}

/**
 *
 * @returns 获取信息列表
 */
export const getInfoList = () => {
  return Service({ url: '/get/list' })
}
