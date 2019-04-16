/**
 * Полиморфная функция для прогрева картинок. Используется в слайдерах,
 * что бы подгрузить картинку слудующего слайда как можно раньше.
 * Следующий, после прогревочного, запрос этой картинки получит ответ
 * 304 not modified если кеш в браузере не выключен, что позволит
 * отобразить картинку мгновенно.
 */
export default (
  /** Адрес или массив адресов картинок, которую необходимо "прогреть". */
  urls: string | string[]
  ): Promise<any> => {

  if (!process.client) {
    return
  }

  return new Promise(async resolve => {
    try {
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

      await Promise.all(promises)
      resolve()
    } catch (error) {
      console.error(`is client: ${process.client} >>> preloadImages error: ${error}`)
    }
  })
}
