/** Обзервер вызывает коллбэк при появлении HTML-элементов (targets) в области видимости */
interface Options {
  /** HTML-элемент или массив/нодлист элементов */
  targets: Element | Element[] | NodeList
  /** Отступ от края элемента - величина видимой части элемента для вызова коллбэка ifIntoView */
  offset: number
  /** Внимание, **this** в этом коллбеке ссылается на текущий элемент. Коллбэк, срабатывающий когда элемент появляется в зоне видимости с учетом offset */
  ifIntoView?: () => void
  /** Внимание, **this** в этом коллбеке ссылается на текущий элемент. Коллбэк, срабатывающий когда элемент находится вне зоны видимости с учетом offset */
  ifOutOfView?: () => void
}

export default class VisibilityObserver {
  options: Options
  observer: any

  constructor(options: Options) {
    this.options = options
    let targets = options.targets;

    if (targets instanceof NodeList) {
      targets = Array.from(targets) as Element[]
    }

    if (!Array.isArray(targets)) {
      targets = [targets]
    }

    for (const target of targets) {
      this.observe(target)
    }
  }

  observe(target) {
    this.observer = new IntersectionObserver(entries => {
      const entry = entries[0]

      if (entry.isIntersecting) {
        if ('ifIntoView' in this.options) {
          this.options.ifIntoView.call(target)
        }
      } else {
        if ('ifOutOfView' in this.options) {
          this.options.ifOutOfView.call(target)
        }
      }
    }, {
      rootMargin: `-${this.options.offset}px`,
    })

    this.observer.observe(target)
  }

  destroy() {
    this.observer.disconnect()
  }
}
