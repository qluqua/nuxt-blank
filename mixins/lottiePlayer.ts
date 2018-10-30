import lottie from 'lottie-web'

export default function(
  /** Объект созданный из JSON анимации (путь к файлу JSON передается через await import при обращении к функции) */
  animationData: any,
  /** Контейнер, в котором будет запущена анимация */
  container: HTMLElement
) {
  return new Promise(async resolve => {
    lottie
    .loadAnimation({
      container,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      // animationData: this.options.animationData, // the animation data
      animationData,
      rendererSettings: {
        // context: canvasContext, // the canvas context
        scaleMode: 'noScale',
        clearCanvas: false,
        progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
        hideOnTransparent: true, // Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
        // className: 'js-logo-animated'
      }
    })
    .addEventListener('complete', resolve)
  })
}
