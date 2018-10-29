/**
 * @description "Element is visible in viewport" handler. Based on intersection observer api.
 * https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

import 'intersection-observer' // IE poyfill for Intersection Observer API

interface ScrollObserverOptions {
  /**
   * Node-лист или массив HTML-элементов, каждый из которых будет получать
   * CSS-класс из параметра "classAnimateFrom" при исчезновении из области
   * видимости и лишаться его при появлении в ней.
   */
  elements: HTMLElement[],
  /**
   * Имя CSS-класса который добавляется ко всем элементам вне видимой области
   * и удаляется при их "появлении", таким образом анимируя переход от скрытого
   * состояния к видимому. Все анимации/транзишены описывайте в СSS.
   * Значение по-умолчанию: 'is-scroll-invisible'
   */
  classAnimateFrom: string,
  /**
   * Добавлять класс 'is-scroll-invisible' (или ваш кастомный) при исчезновении
   * элеементов, что бы анимировать их вновь при попадании в видимую область?
   * Значение по-умолчанию: false
   */
  reverse?: boolean,
  /**
   * Отступ от видимой области браузера в пикселях.
   * Например offset: 50 означает, что элемент получит класс видимого когда
   * войдет в видимую область хотя бы на 50 пикселей. Так же элемент потеряет класс
   * видимого за 50 пикселей до своего выхода из видимой области, если исользовать
   * параметр reverse: true.
   * Значение по-умолчанию: 50
   */
  offset?: number
}

export default class ScrollObserver {
  private options: ScrollObserverOptions
  private optionsDefault: ScrollObserverOptions = {
    elements: null,
    classAnimateFrom: 'is-scroll-invisible',
    offset: 50,
    reverse: false
  }

  constructor(optionsUser: ScrollObserverOptions) {
    this.options = Object.assign(Object.create(null), this.optionsDefault, optionsUser)

    this.initObersver()
  }

  private initObersver() {
    const observer = new IntersectionObserver(entries => {
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
    }, {
      // IntersectionObserver API options:
      // root: document.querySelector('#scrollArea'),
      rootMargin: `-${this.options.offset}px`,
      // threshold: 0
    })

    for (const el of this.options.elements) {
      observer.observe(el)
      el.classList.add(this.options.classAnimateFrom)
    }
  }
}
