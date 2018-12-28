export default function(x: number, y: number, element: HTMLElement) {
  const { top, left, width } =  element.getBoundingClientRect()
  const elX = Math.round(left + width / 2)
  const elY = Math.round(top + width / 2)
  const atan2 = Math.atan2(y - elY, x - elX)
  let angle = Math.round(atan2 * (180 / Math.PI))

  if (angle < 0) {
    angle = 360 - (-angle)
  }

  return angle
}
