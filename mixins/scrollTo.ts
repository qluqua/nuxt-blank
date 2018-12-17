/** Функция вертикальной прокрутки на заданное расстояние или до указанного HTML-элемента
 * !!! Для IE применяется scrollIntoView вместо scrollTo, т.е. скролл на IE будет
 * срабатывать только если передан объект, а не число.
 */
function scrollTo(
  /** Число, строка или объект (HTML-элемент)
   * Если объект - рассчитывается расстояние от края экрана до верхней границы элемента
   * и прибавляется величина прокрутки экрана.
   * Если число - скроллит на заданное число px.
   * Если строка — к селектору в DOM
   * Значение по умолчанию - для прокрутки к началу страницы
   */
  payload: any = 0,
  /** Отступ от верхнего края экрана */
  offset: number = 0,
  duration: number = 600,
  callback: any = null
) {
  let top: number

  if (typeof payload === 'object') {
    // HTMLElement expected
    top = calcTop(payload)
  } else if (typeof payload === 'number') {
    // Number of pixels from top
    top = payload
  } else if (typeof payload === 'string') {
    // DOM seletor like '.class-name' or '#myElement' expected
    const el: HTMLElement = document.querySelector(payload)

    if (!el) {
      return
    }

    top = calcTop(el)
  }

  if (top >= offset) {
    top -= offset
  }

  top = Math.floor(top)

  scrollToAnimation(top, duration, callback)
}

function calcTop(el) {
  return el.getBoundingClientRect().top + window.pageYOffset
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2

  if (t < 1) {
    return c / 2 * t * t + b
  }

  t--

  return -c / 2 * (t * (t - 2) - 1) + b
}

function scrollToAnimation(to = 0, duration, callback) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    document.documentElement.scrollTop = amount
    document.body.parentNode['scrollTop'] = amount
    document.body.scrollTop = amount
  }

  function position() {
    return document.documentElement.scrollTop || document.body.parentNode['scrollTop'] || document.body.scrollTop
  }

  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0

  function animateScroll() {
    // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    const val = easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll)
    } else {
      if (callback && typeof(callback) === 'function') {
        // the animation is done so lets callback
        callback()
      }
    }
  }

  animateScroll()
}

export { scrollTo }
export default scrollTo
