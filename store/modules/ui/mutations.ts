export default {
  setViewportSize(state, payload: number[]) {
    state.windowWidth = payload[0]
    state.windowHeight = payload[1]
  },
  setDeviceType(state, payload: string) { state.deviceType = payload },
  isIe(state) { state.isIe = true },
  isEdge(state) { state.isEdge = true },
  setBrowser(state, payload) { state.browser = payload }
}
