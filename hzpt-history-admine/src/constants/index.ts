export interface Category {
  col?: number
  id?: string
  name: string
  urlname?: string
}

export interface Info {
  id: number
  category: string
  grade: string

  classname: string
  description: string

  photo: string
  photoDownLink: string
  photoWidth: number
  photoHeight: number
  photoType: string

  panelimgurl?: string
}
