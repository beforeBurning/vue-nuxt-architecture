/**
 * 从地址栏获取参数
 * @param {string} name - 需要获取的参数key
 * @param {string | void} url - 当前url | 传入的字符
 */
export const getUrlParam = (name, url) => {
  const link = url || window.location.href
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = link.substr(link.indexOf('?') + 1).match(reg)
  if (r !== null) {
    const i = decodeURIComponent(r[2]).indexOf('#')
    if (i !== -1) {
      return decodeURIComponent(r[2]).substring(0, i)
    } else {
      return decodeURIComponent(r[2])
    }
  } else {
    return ''
  }
}

/**
 * 前端生成唯一值
 */
export const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 获取图片宽高
 * @param {string} name - 资源地址
 * @param {string} url - 指定返回结果
 */
export const getImageScale = (url, type) => {
  return new Promise((resolve) => {
    if (!url) { return }
    const result = {}
    const img = new Image()
    img.src = url
    // 判断是否有缓存
    if (img.complete) {
      result.width = img.width
      result.height = img.height
      resolve(type ? result[type] : result)
    } else {
      img.onload = () => {
        result.width = img.width
        result.height = img.height
        resolve(type ? result[type] : result)
      }
    }
  })
}

/**
 * 获取视频宽高
 * @param {string} name - 资源地址
 * @param {string} url - 指定返回结果
 */
export const getVideoScale = (url, type) => {
  return new Promise((resolve) => {
    const result = {}
    let video = document.createElement('video')
    video.setAttribute('src', url)
    video.addEventListener('canplay', (e) => {
      result.width = e.target.videoWidth
      result.height = e.target.videoHeight
      video = null
      resolve(type ? result[type] : result)
    })
  })
}

/**
 * 检测参数是否对象
 * @param {any} value - param
 */
export const isObject = (value) => {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
