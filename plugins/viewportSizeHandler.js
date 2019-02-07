import { debounce } from 'lodash-es'

export default ({ store }) => {
  const viewportSizeHandler = () => {
    const queriesAll = Object.entries(store.state.ui.grid.queries)
    const queriesCurrent = queriesAll.filter(query => window.matchMedia(query[1]).matches)
    const breakpoint = queriesCurrent.find(rule => rule[0].length === 2)[0]

    store.commit('ui/updateViewportInfo', [document.body.clientWidth, document.body.clientHeight, breakpoint])
  }

  viewportSizeHandler()

  window.addEventListener('resize', viewportSizeHandler)
  // window.addEventListener('resize', debounce(viewportSizeHandler, 16))
}
