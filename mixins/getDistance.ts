export default function(
  /** Mouse X position */
  mouseX: number,
  /** Mouse Y position */
  mouseY: number,
  /** HTMLElement getBoundingClientRect().top */
  top: number,
  /** HTMLElement getBoundingClientRect().right */
  right: number,
  /** HTMLElement getBoundingClientRect().bottom */
  bottom: number,
  /** HTMLElement getBoundingClientRect().left */
  left: number): number {

  // left top
  if (mouseX < left && mouseY < top) {
    return Math.floor(
      Math.sqrt(
        Math.pow(left - mouseX, 2) +
        Math.pow(top - mouseY, 2)
      )
    )
  }

  // left center
  if (mouseX < left && mouseY >= top && mouseY <= bottom) {
    return Math.floor(left - mouseX)
  }

  // left bottom
  if (mouseX < left && mouseY > bottom) {
    return Math.floor(
      Math.sqrt(
        Math.pow(left - mouseX, 2) +
        Math.pow(mouseY - bottom, 2)
      )
    )
  }

  // center top
  if (mouseX >= left && mouseX <= right && mouseY < top) {
    return Math.floor(top - mouseY)
  }

  // center bottom
  if (mouseX >= left && mouseX <= right && mouseY > bottom) {
    return Math.floor(mouseY - bottom)
  }

  // right top
  if (mouseX > right && mouseY < top) {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - right, 2) +
        Math.pow(top - mouseY, 2)
      )
    )
  }

  // right center
  if (mouseX > right && mouseY >= top && mouseY <= bottom) {
    return Math.floor(mouseX - right)
  }

  // right bottom
  if (mouseX > right && mouseY > bottom) {
    return Math.floor(
      Math.sqrt(
        Math.pow(mouseX - right, 2) +
        Math.pow(mouseY - bottom, 2)
      )
    )
  }

  // inside
  return 0
}
