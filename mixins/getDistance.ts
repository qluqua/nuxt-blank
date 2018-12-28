export default function(x: number, y: number, element: HTMLElement) {
  const { top, right, bottom, left } = element.getBoundingClientRect()

  // лево верх
  if (x < left && y < top) {
    return Math.floor(
      Math.sqrt(
        Math.pow(left - x, 2) +
        Math.pow(top - y, 2)
      )
    )
  }

  // лево центр
  if (x < left && y >= top && y <= bottom) {
    return left - x
  }

  // лево низ
  if (x < left && y > bottom) {
    return Math.floor(
      Math.sqrt(
        Math.pow(left - x, 2) +
        Math.pow(y - bottom, 2)
      )
    )
  }

  // центр верх
  if (x >= left && x <= right && y < top) {
    return top - y
  }

  // центр низ
  if (x >= left && x <= right && y > bottom) {
    return y - bottom
  }

  // право верх
  if (x > right && y < top) {
    return Math.floor(
      Math.sqrt(
        Math.pow(x - right, 2) +
        Math.pow(top - y, 2)
      )
    )
  }

  // право центр
  if (x > right && y >= top && y <= bottom) {
    return x - right
  }

  // право низ
  if (x > right && y > bottom) {
    return Math.floor(
      Math.sqrt(
        Math.pow(x - right, 2) +
        Math.pow(y - bottom, 2)
      )
    )
  }

  // внутри
  return 0
}
