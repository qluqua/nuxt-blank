/** Функция возвращает величину для transform: translateY() в зависимости от положения элемента в зоне viewport */

export default function(
  /** HTML-элемент, которому мы хотим менять translateY */
  el: HTMLElement,
  /** Число, которым мы задаем диапазон движения элемента в завимости от положения в зоне Viewport.  */
  range: number,
  /** Флаг. Если true, то результаты будет в диапазоне от -range / 2 до +range / 2
   * Если false, то резльутат будет в диапазоне от 0 до range
   */
  centerMode: boolean = true
): number {
  const shift = centerMode ? 0.5 : 0
  const { top }: { top: number } = el.getBoundingClientRect()
  const windowHeight: number = window.innerHeight
  const elHeight: number = el.offsetHeight
  const viewPortRange: number = windowHeight - elHeight
  let curPos: number = top
  let transform: number

  if (el.style.transform) {
    const transformStyle: string = getComputedStyle(el).transform || getComputedStyle(el).webkitTransform
    transform = parseInt(transformStyle.match(/-?\d*\.?\d*\)$/)[0], 10)
    curPos -= transform
  }

  if (curPos < 0) curPos = 0

  if (curPos > viewPortRange) curPos = viewPortRange

  return Math.floor(((curPos / viewPortRange - shift) * range))
}
