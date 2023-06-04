/**
 * 从 itemElement 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements: HTMLElement[]) => {
  const imgElements: HTMLImageElement[] = []
  itemElements.forEach((el) => {
    imgElements.push(...Array.from(el.getElementsByTagName('img')))
  })
  return imgElements
}

/**
 * 生成所有的图片链接数组
 */
export const getAllImg = (itemElements: HTMLImageElement[]) => {
  return itemElements.map((imgElement) => {
    return imgElement.src
  })
}

/**
 * 监听图片数组加载完成
 */
export const onComplateImgs = (imgs: string[]) => {
  // promise 集合
  const promiseAll: Promise<any>[] = []

  // 循环 imgs 构建 promiseAll
  imgs.forEach((img, index) => {
    promiseAll[index] = new Promise((resolve, _) => {
      // 处理 img 的加载情况
      const imageObj = new Image()
      imageObj.src = img
      imageObj.onload = () => {
        resolve({
          img,
          index,
        })
      }
    })
  })
  return Promise.all(promiseAll)
}

/**
 * 返回列高对象中最小的高度
 */
export const getMinHeight = (columnHeightObj: any) => {
  const columnHeightArr: any[] = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中最大的高度
 */
export const getMaxHeight = (columnHeightObj: any) => {
  const columnHeightArr: any[] = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}

/**
 * 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj: any) => {
  // 拿到最小的高度
  const minHeight = getMinHeight(columnHeightObj)

  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}
