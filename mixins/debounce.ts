/**
 *
 * @param func функция которая будет вызываться если с момента предыдущего вызова прошло больше N ms
 * @param ms задержка вызова функции
 */

export default function(func, ms) {
  let isThrotled = false

  function wrapper() {
    if (isThrotled) return

    func.apply(this, arguments)

    isThrotled = true

    setTimeout(() => {
      isThrotled = false
    }, ms)
  }

  return wrapper
}
