/**
 * Полиморфная функция для прогрева картинок. Используется в слайдерах,
 * что бы подгрузить картинку слудующего слайда как можно раньше.
 * Следующий, после прогревочного, запрос этой картинки получит ответ
 * 304 not modified если кеш в браузере не выключен, что позволит
 * отобразить картинку мгновенно.
 */

interface PreloadImagesOptions {
  verbose?: boolean
}

export default (
  /** Адрес или массив адресов картинок, которую необходимо "прогреть". */
  urls: string | string[],
  options: PreloadImagesOptions
  ): Promise<any> => {

  if (process && !process.client) return

  if (!urls || !urls.length) {
    console.error(`>>> preloadImages error, condition executed: (!urls || !urls.length)`)
    return
  }

  return new Promise(async (resolve, reject) => {
    if (typeof urls === 'string') {
      urls = [urls]
    }

    const promises = []

    for (const url of urls) {
      const image = new Image() as HTMLImageElement
      const promise = new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = reject
        image.src = url
      })

      promises.push(promise)
    }

    const start = performance.now()
    let loadingTime = null as number

    try {
      await Promise.all(promises)
      loadingTime = Math.round(performance.now() - start)

      if (options && options.verbose) {
        console.log(`preloadImages: ${urls.length} images preloaded in ${loadingTime}ms`)
      }

      resolve(loadingTime)
    } catch(error) {
      console.error(`>>> preloadImages error: ${error}`)
      reject(error)
    }
  })
}
