export interface ViewportInfo {
  windowWidth: number,
  windowHeight: number,
  documentWidth: number,
  documentHeight: number,
  scrollbarWidth: number,
  breakpoint: string
}

export default ({ store }) => {
  // Resize. The reason for iframe usage is window resize event, that doesn't fire if
  // vertical scrollbar appears and this causes problems time after time
  const iframe = document.createElement('iframe')

  iframe.setAttribute('id', '_resizeTrigger')
  iframe.setAttribute('style', 'position: absolute; z-index: -9999; visibility: hidden; width: 100%; min-height: 100%; height: auto; top: 0; border: none;')
  document.body.appendChild(iframe)
  iframe.contentWindow.addEventListener('resize', sizeHandler)

  function sizeHandler() {
    const queriesAll = Object.entries(store.state.ui.grid.queries)
    const queriesCurrent = queriesAll.filter((query: any) => window.matchMedia(query[1]).matches)
    const breakpoint = queriesCurrent.find(rule => rule[0].length === 2)[0]
    const { offsetWidth, offsetHeight } = document.documentElement as HTMLElement
    const { innerWidth, innerHeight } = window as Window
    const scrollbarWidth = innerWidth - offsetWidth

    const viewportInfo: ViewportInfo = {
      windowWidth: innerWidth,
      windowHeight: innerHeight,
      documentWidth: offsetWidth,
      documentHeight: offsetHeight,
      scrollbarWidth,
      breakpoint
    }

    store.commit('ui/updateViewportInfo', viewportInfo)
  }

  sizeHandler()

  window.addEventListener('scroll', () => {
    store.dispatch('ui/updateScrollPosition', window.pageYOffset)
  })
}
