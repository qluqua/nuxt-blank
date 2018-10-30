export default {
  setViewportSize(state, payload: number[]) {
    state.windowWidth = payload[0]
    state.windowHeight = payload[1]
  },
  setPlatform(state, payload: string) { state.platform = payload },
  setOs(state, payload: string) { state.os = payload },
  isIe(state) { state.isIe = true },
  isEdge(state) { state.isEdge = true },
}
