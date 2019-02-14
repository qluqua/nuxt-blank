export default function(x: number, y: number, element: HTMLElement) {
  // https://stackoverflow.com/questions/19618745/css3-rotate-transition-doesnt-take-shortest-way
  // Решаем порблему с css-transition - нормализуем угол поворота
  const closestEquivalentAngle = (from, to) => from + ((((to - from) % 360) + 540) % 360) - 180

  // Вычисляем новый угол
  const { top, left, width } =  element.getBoundingClientRect()
  const elX = Math.round(left + width / 2)
  const elY = Math.round(top + width / 2)
  const atan2 = Math.atan2(y - elY, x - elX)
  const angleNew = Math.round(atan2 * (180 / Math.PI)) + 90 // +90 что бы 0 градусов было по центру сверху

  // Вычисляем старый угол
  let angleOld = null

  try {
    angleOld = +element.getAttribute('style').split('rostate(')[1].split('deg')[0]
  } catch (error) {
    // console.log(error)
  }

  return angleOld ? closestEquivalentAngle(angleOld, angleNew) : angleNew
}
