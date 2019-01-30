const grid = require('@/styles/grid-config.json')

// Отдельный массив чисел-брейкпоинтов, отсортированный по возрастанию
grid.numbers = Object.keys(grid.breakpoints).map(key => grid.breakpoints[key]).sort((a: any, b: any) => a - b)

export default {
  grid,
  isIe: null,
  isEdge: null,
  deviceType: null,
  browser: null,
  windowWidth: null,
  windowHeight: null,
}
