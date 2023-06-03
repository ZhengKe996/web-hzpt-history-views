import Service from '@/utils/request'
import { Category, Info } from '@/constants'

/**
 *
 * @returns 获取学院列表
 */
export const getCategory = () => {
  return Service({ url: '/get/category' })
}
/**
 *
 * @returns 获取学院列表
 */
export const getIndexes = () => {
  return Service({ url: '/get/indexes' })
}

/**
 *
 * @returns 设置学院信息
 */
export const setCategory = (category: Category) => {
  return Service({ method: 'POST', url: '/set/category', data: category })
}

/**
 *
 * @returns 设置学院信息（列表）
 */
export const setCategorys = (categorys: Category[]) => {
  return Service({ method: 'POST', url: '/set/category/all', data: categorys })
}

/**
 *
 * @returns 修改学院信息
 */
export const changeCategory = (
  id: number | string | undefined,
  category: Category
) => {
  return Service({
    method: 'PATCH',
    url: `/set/category/${id}`,
    data: category,
  })
}
/**
 *
 * @returns 删除学院信息
 */
export const deleteCategory = (id: number) => {
  return Service({
    method: 'DELETE',
    url: `/set/category/${id}`,
  })
}

/**
 *
 * @returns 获取信息列表
 */
export const getGrade = () => {
  return Service({ url: '/get/grade' })
}

/**
 *
 * @returns 获取信息列表
 */
export const getInfoList = (data?: any) => {
  return Service({ url: '/get/list', params: data })
}

/**
 *
 * @returns 获取信息(单)
 */
export const getInfoByone = (id: string | number) => {
  return Service({ url: `/get/list/${id}` })
}

/**
 *
 * @returns 设置信息（单）
 */
export const setInfoByOne = (info: Info) => {
  return Service({ method: 'POST', url: '/set/list', data: info })
}

/**
 *
 * @returns 修改信息（单）
 */
export const changeInfoByOne = (id: number, info: Info) => {
  return Service({ method: 'PATCH', url: `/set/list/${id}`, data: info })
}

/**
 *
 * @returns 删除信息（单）
 */
export const deleteInfoByone = (id: string | number) => {
  return Service({ method: 'DELETE', url: `/set/list/${id}` })
}

/**
 *
 * @returns 设置信息（列表）
 */
export const setInfoByLIst = (infos: Info[]) => {
  return Service({ method: 'POST', url: '/set/list-all', data: infos })
}
