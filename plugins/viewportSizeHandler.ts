// import { debounce } from 'lodash-es'

export default ({ store }) => {
  const viewportSizeHandler = () => {
    const queriesAll = Object.entries(store.state.ui.grid.queries)
    const queriesCurrent = queriesAll.filter((query: any) => window.matchMedia(query[1]).matches)
    const breakpoint = queriesCurrent.find(rule => rule[0].length === 2)[0]
    const { offsetWidth, offsetHeight } = document.documentElement
    const scrollbarWidth = window.innerWidth - offsetWidth

    store.commit('ui/updateViewportInfo', [offsetWidth, offsetHeight, breakpoint, scrollbarWidth])
  }

  viewportSizeHandler()

  window.addEventListener('resize', viewportSizeHandler)
  // window.addEventListener('resize', debounce(viewportSizeHandler, 60))
}
