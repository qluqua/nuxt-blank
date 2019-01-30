export default {
  columns(state, getters) { return state.grid.columns[getters.breakpoint] },
  gutter(state, getters) { return state.grid.gutters[getters.breakpoint] },
  offset(state, getters) { return state.grid.offsets[getters.breakpoint] },
  breakpoint(state) {
    const w = state.windowWidth
    const b = state.grid.breakpoints

    if (w >= b.xl) return 'xl'
    if (w >= b.lg && w < b.xl) return 'lg'
    if (w >= b.md && w < b.lg) return 'md'
    if (w >= b.sm && w < b.md) return 'sm'
    if (w < b.sm) return 'xs'
  },
  mediaRules(state) {
    if (!process['browser']) return // not for SSR

    const { queries } = state.grid
    const queriesArray = Object.entries(queries) as any[]
    const query = queriesArray.filter(query => matchMedia(query[1]).matches)
    const w = state.windowWidth // forcing recalculate each time window width changes

    return query
  },
  mediaRule(state, getters) {
    return getters.mediaRules.find(rule => rule[0].length === 2)[0]
  }
}
