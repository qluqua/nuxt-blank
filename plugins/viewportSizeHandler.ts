import { debounce } from 'lodash-es'
import state from '@/store/modules/ui/state'

export default ({ store }) => {
  const viewportSizeHandler = () => {
    const queriesAll = Object.entries(state.grid.queries) as any[]
    const queriesCurrent = queriesAll.filter(query => window.matchMedia(query[1]).matches)
    const breakpoint = queriesCurrent.find(rule => rule[0].length === 2)[0]

    store.commit('ui/updateViewportInfo', [window.innerWidth, window.innerHeight, breakpoint])
  }

  viewportSizeHandler()

  window.addEventListener('resize', debounce(viewportSizeHandler, 16))
}
