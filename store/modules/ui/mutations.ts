export default {
  updateWindowWidth(state, payload: number) { state.windowWidth = payload },
  setPlatform(state, payload: string) { state.platform = payload },
  setOs(state, payload: string) { state.os = payload },
}
