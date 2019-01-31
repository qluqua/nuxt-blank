const grid = require('@/styles/grid-config.json')

// Отдельный массив чисел-брейкпоинтов, отсортированный по возрастанию
grid.numbers = Object.keys(grid.breakpoints).map(key => grid.breakpoints[key]).sort((a: any, b: any) => a - b)

export const state = () => ({
  grid,
  breakpoint: null,
  isIe: null,
  isEdge: null,
  deviceType: null,
  browser: null,
  windowWidth: null,
  windowHeight: null,
})

export const getters = {
  columns(state) { return state.grid.columns[state.breakpoint] },
  gutter(state) { return state.grid.gutters[state.breakpoint] },
  offset(state) { return state.grid.offsets[state.breakpoint] },
}

export const mutations = {
  updateViewportInfo(state, payload: any[]) {
    state.windowWidth = payload[0]
    state.windowHeight = payload[1]
    state.breakpoint = payload[2]
  },
  setDeviceType(state, payload: string) { state.deviceType = payload },
  isIe(state) { state.isIe = true },
  isEdge(state) { state.isEdge = true },
  setBrowser(state, payload) { state.browser = payload },
  setBreakpoint(state, payload: string) { state.breakpoint = payload }
}

// export const actions = {

// }
