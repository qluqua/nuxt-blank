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
  return new Promise((resolve, reject) => {
    const image = new Image() as HTMLImageElement

    if (typeof urls === 'string') {
      urls = [urls]
    }

    for (const url of urls) {
      image.onload = resolve
      image.onerror = reject
      image.src = url
    }
  })
}
