import Logo from '@/assets/images/logo.png'
import LogoSM from '@/assets/images/logo-sm.png'
import HeaderBg from '@/assets/images/header-bg.png'

export { Logo, LogoSM, HeaderBg }
// PC 设备指定宽度
export const PC_DEVICE_WIDTH: number = 1280

/**
 * @description Category 类型
 */
export interface Category {
  col?: number
  id: string
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

/**
 * @description Grade 类型
 */
export interface Grade {
  id: string
  grade: string
}

/**
 * @description 主题类型
 */
export interface ThemeType {
  id: string
  type: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM
  icon: string
  name: string
}

// category 的本地构建数据
export const ALL_CATEGORY_ITEM = {
  id: 'all',
  name: '全部',
}

export const ALL_Grade_ITEM = {
  id: '',
  grade: '全部',
}

// 初始 category 数据
export const CATEGORY_NOMAR_DATA = [
  ALL_CATEGORY_ITEM,
  {
    id: 'web-of-things',
    name: '物联网技术学院',
    col: 1,
    urlname: 'web-of-things',
  },
  {
    id: 'art-design',
    name: '艺术设计学院',
    col: 1,
    urlname: 'art-design',
  },
  {
    id: 'tour-management',
    name: '旅游管理学院',
    col: 1,
    urlname: 'tour-management',
  },
  {
    id: 'education',
    name: '学前教育学院',
    col: 1,
    urlname: 'education',
  },
  {
    id: 'business-management',
    name: '商务管理学院',
    col: 1,
    urlname: 'business-management',
  },
  {
    id: 'city-construction',
    name: '城市建设学院',
    col: 1,
    urlname: 'city-construction',
  },
  {
    id: 'intelligent-manufacturing',
    name: '智能制造学院',
    col: 1,
    urlname: 'intelligent-manufacturing',
  },
  {
    id: 'automotive-engineering',
    name: '汽车工程学院',
    col: 1,
    urlname: 'automotive-engineering',
  },
]

// 暗黑主题
export const THEME_DARK = 'dark'
// 浅色主题
export const THEME_LIGHT = 'light'
// 系统主题
export const THEME_SYSTEM = 'system'

// 构建渲染数据源
export const ThemeArray: ThemeType[] = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白',
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极夜黑',
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统',
  },
]
