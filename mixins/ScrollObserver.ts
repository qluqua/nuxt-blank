/**
 * @description "Element is visible in viewport" handler. Based on intersection observer api.
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */
interface ScrollObserverOptions {
  /**
   * Node-лист или массив HTML-элементов, каждый из которых будет получать
   * CSS-класс из параметра "classAnimateFrom" при исчезновении из области
   * видимости и лишаться его при появлении в ней.
   */
  elements: HTMLElement[],
  /**
   * Имя CSS-класса который удаляется у всех элементов в видимой области
   * таким образом анимируя переход от скрытого
   * состояния к видимому. Все анимации/транзишены описывайте в СSS.
   */
  classAnimateFrom: string,
  /**
   * Добавлять класс 'js-soa-start' (или ваш кастомный) при исчезновении
   * элеементов, что бы анимировать их вновь при попадании в видимую область?
   */
  reverse?: boolean,
  /**
   * Отступ от видимой области браузера в пикселях.
   * Например offset: 50 означает, что элемент получит класс видимого когда
   * войдет в видимую область хотя бы на 50 пикселей. Так же элемент потеряет класс
   * видимого за 50 пикселей до своего выхода из видимой области, если исользовать
   * параметр reverse: true.
   */
  offset?: number
}

export default class ScrollObserver {
  private options: ScrollObserverOptions
  private optionsDefault: ScrollObserverOptions = {
    elements: null,
    classAnimateFrom: 'js-soa-start',
    offset: 50,
    reverse: false
  }

  constructor(optionsUser: ScrollObserverOptions) {
    this.options = Object.assign(Object.create(null), this.optionsDefault, optionsUser)

    this.initObersver()
  }

  private initObersver() {
    const observer = new IntersectionObserver(entries => {
      try {
        for (const entry of entries) {
          const { isIntersecting, target } = entry
          const className = this.options.classAnimateFrom
          const reverse = this.options.reverse

          if (isIntersecting) {
            target.classList.remove(className)

            if (!reverse) {
              observer.unobserve(target)
            }
          } else {
            target.classList.add(className)
          }
        }
      } catch (error) {
        console.log('ScrollObserver: ' + error)
      }
    }, {
      // IntersectionObserver API options:
      // root: document.querySelector('#scrollArea'),
      rootMargin: `-${this.options.offset}px`,
      // threshold: 0
    })

    const elements = this.options.elements

    if (!elements || !elements.length) {
      return
    }

    try {
      for (const el of elements) {
        observer.observe(el)
      }
    } catch (error) {
      console.log('ScrollObserver: ' + error)
    }
  }
}
