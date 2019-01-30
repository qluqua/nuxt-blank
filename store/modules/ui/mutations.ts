export default {
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
