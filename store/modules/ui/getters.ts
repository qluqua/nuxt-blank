export default {
  columns(state) { return state.grid.columns[state.breakpoint] },
  gutter(state) { return state.grid.gutters[state.breakpoint] },
  offset(state) { return state.grid.offsets[state.breakpoint] },
}
