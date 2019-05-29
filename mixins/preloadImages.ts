const cache: { [key: string]: Promise<HTMLImageElement> } = {}

interface PreloadImagesOptions {
  verbose?: boolean
}

/**
 * Полиморфная функция для прогрева картинок. Используется в слайдерах,
 * что бы подгрузить картинку слудующего слайда как можно раньше.
 * Следующий, после прогревочного, запрос этой картинки получит ответ
 * 304 not modified если кеш в браузере не выключен, что позволит
 * отобразить картинку мгновенно.
 */
export default (
  /** Адрес или массив адресов картинок, которую необходимо "прогреть". */
  urls: string | string[],
  options?: PreloadImagesOptions
  ): Promise<HTMLImageElement[]> => {
  const isDev = process && process.env && process.env.NODE_ENV === 'development'

  if (process && !process.client) return

  if (!urls || !urls.length) {
    console.error(`>>> preloadImages error: no urls recieved. urls:  ${urls}`)
    return
  }

  if (typeof urls === 'string') {
    urls = [urls]
  }

  const verboseMode = isDev && options && options.verbose

  return new Promise(async (resolve, reject) => {
    const promises = []
    let cacheCount = 0

    for (const url of urls) {
      if (cache[url]) {
        promises.push(cache[url])
        cacheCount++
        continue
      }

      const image = new Image() as HTMLImageElement
      const promise: Promise<HTMLImageElement> = new Promise((resolve, reject) => {
        image.onload = () => {
          resolve(image)
          cache[url] = promise
        }
        image.onerror = reject
        image.src = url
      })

      promises.push(promise)
    }

    const start = performance.now()
    let loadingTime = null as number

    try {
      const images = await Promise.all(promises)
      loadingTime = Math.round(performance.now() - start)

      verboseMode && console.log(`preloadImages: ${urls.length} images, ${cacheCount} taken from cache, loading time ${loadingTime}ms`, urls)

      resolve(images)
    } catch(error) {
      console.error(`>>> preloadImages error: ${error}`)
      reject(error)
    }
  })
}
