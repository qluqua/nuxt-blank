const grid = require('@/styles/grid-config.json')

// Отдельный массив чисел-брейкпоинтов, отсортированный по возрастанию
grid.numbers = Object.keys(grid.breakpoints).map(key => grid.breakpoints[key]).sort((a: any, b: any) => a - b)

export const state = () => ({
  grid,
  breakpoint: null as string,
  isIe: null,
  isEdge: null,
  deviceType: null,
  browser: null,
  windowWidth: null as number,
  windowHeight: null as number,
  locale: null,
  menuIsOpen: null,
})

export const getters = {
  columns(state) { return state.grid.columns[state.breakpoint] },
  gutterWidth(state) { return state.grid.gutters[state.breakpoint] },
  offsetWidth(state) { return state.grid.offsets[state.breakpoint] },
  columnWidth(state, getters) {
    const { windowWidth } = state
    const { columns, gutterWidth, offsetWidth } = getters
    const colWidth = (windowWidth - (offsetWidth * 2) - (gutterWidth * (columns - 1))) / columns

    return colWidth
  },
  isDesktop(state) { return state.deviceType === 'desktop' },
  isTablet(state) { return state.deviceType === 'tablet' },
  isMobile(state) { return state.deviceType === 'mobile' },
  isTouchDevice(state) { return state.deviceType !== 'desktop' },
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
  setBreakpoint(state, payload: string) { state.breakpoint = payload },
  // setLocale(state, payload: string) { state.locale = payload },
}

export const actions = {
  hideAllOverlayElements({ commit }) {
    // commit('setMenuIsOpen', false)
  }
}
