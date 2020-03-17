export default (
  /**
   * url видео, которое необходимо "прогреть".
   */
  url: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const el = document.createElement('video')

    el.src = '/videos/video.mp4'
    el.muted = true
    el.autoplay = false
    el.preload = 'auto'
    // el.preload = 'metadata'
    el.setAttribute('style', 'display: none !important;')

    el.onloadedmetadata = () => {
      document.body.removeChild(el)
      resolve()
    }

    document.body.appendChild(el)
  })
}
