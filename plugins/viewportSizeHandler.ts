import { debounce } from 'lodash-es'

export default ({ store }) => {
  // Resize. The reason for iframe usage is window resize event, that doesn't fire if
  // vertical scrollbar appears and this causes problems time after time
  const iframe = document.createElement('iframe')

  iframe.setAttribute('id', '_resizeTrigger')
  iframe.setAttribute('style', 'position: fixed; z-index: -9999; visibility: hidden; top: -1px; left: 0; right: 0; height: 0px; width: 100%; border: none;')
  document.body.appendChild(iframe)
  iframe.contentWindow.addEventListener('resize', sizeHandler)

  function sizeHandler() {
    const queriesAll = Object.entries(store.state.ui.grid.queries)
    const queriesCurrent = queriesAll.filter((query: any) => window.matchMedia(query[1]).matches)
    const breakpoint = queriesCurrent.find(rule => rule[0].length === 2)[0]
    const { offsetWidth } = document.documentElement
    const scrollbarWidth = window.innerWidth - offsetWidth

    store.commit('ui/updateViewportInfo', [offsetWidth, window.innerHeight, breakpoint, scrollbarWidth])
  }

  sizeHandler()

  // Scroll
  const scrollHandler = () => {
    store.commit('ui/setScrollY', window.pageYOffset)
  }

  window.addEventListener('scroll', debounce(scrollHandler, 16))
}
