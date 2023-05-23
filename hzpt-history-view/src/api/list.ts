import Service from '@/utils/request'

export const getInfoList = (data: any) => {
  return Service({ url: '/list', params: data })
}

export const getInfoFromId = (id: number | string) => {
  return Service({
    url: `/list/${id}`,
  })
}
