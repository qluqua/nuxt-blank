/** Обзервер вызывает коллбэк при появлении HTML-элементов (targets) в области видимости */
export interface Options {
  /** HTML-элемент или массив/нодлист/коллекцию элементов */
  targets: Element | Element[] | NodeList | HTMLCollection
  /** Отступ от края элемента - величина видимой части элемента для вызова коллбэка ifIntoView */
  offset: number
  threshold?: number

  /** Внимание, **this** в этом коллбеке ссылается на текущий элемент. Коллбэк, срабатывающий когда элемент появляется в зоне видимости с учетом offset */
  ifIntoView?: () => void
  /** Внимание, **this** в этом коллбеке ссылается на текущий элемент. Коллбэк, срабатывающий когда элемент находится вне зоны видимости с учетом offset */
  ifOutOfView?: () => void
}

export class VisibilityObserver {
  options: Options
  observer: any

  constructor(options: Options) {
    this.options = options
    let targets = options.targets

    if (targets instanceof NodeList || targets instanceof HTMLCollection) {
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
      threshold: this.options.threshold || 0
    })

    this.observer.observe(target)
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect()
    }
  }
}

export default VisibilityObserver
