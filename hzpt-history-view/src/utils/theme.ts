import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

/**
 * 监听系统主题变更
 */
let matchMedia: MediaQueryList
export const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

/**
 * @description 切换主题
 * @param theme 主题参数
 */
export const changeTheme = (
  theme: typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM
) => {
  // html 的 class
  let themeClassName = ''

  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }

  // 修改 html 的 class
  document.querySelector('html')!.className = themeClassName
}
