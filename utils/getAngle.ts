export default function(
  /** Mouse X position */
  mouseX: number,
  /** Mouse Y position */
  mouseY: number,
  /** Element */
  element: HTMLElement,
  /** Element getBoundingClientRect().top */
  top: number,
  /** Element getBoundingClientRect().left */
  left: number): number {
  // https://stackoverflow.com/questions/19618745/css3-rotate-transition-doesnt-take-shortest-way
  // Angle normalizer for CSS transitions
  const closestEquivalentAngle = (from, to) => from + ((((to - from) % 360) + 540) % 360) - 180

  // New angle
  const width = element.offsetWidth
  const elX = Math.round(left + width / 2)
  const elY = Math.round(top + width / 2)
  const atan2 = Math.atan2(mouseY - elY, mouseX - elX)
  const angleNew = Math.round(atan2 * (180 / Math.PI)) + 90 // +90 to make 0 degrees at the top-center

  // Old angle
  const style: string = element.getAttribute('style')
  const elementHasRotation = style && style.includes('rotate')
  const angleOld = elementHasRotation && +style.split('rotate(')[1].split('deg')[0]

  return angleOld ? closestEquivalentAngle(angleOld, angleNew) : angleNew
}
