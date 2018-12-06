export default (
  /**
   * url картнки которую необходимо "прогреть".
   * следующий запрос этой картинки в браузере получит ответ
   * 304 not modified если кеш в браузере не выключен
   */
  url: string
  ): Promise<any> => {
  return new Promise((resolve, reject) => {
    const image = new Image() as HTMLImageElement

    image.onload = resolve
    image.onerror = reject

    image.src = url
  })
}
