import { debounce } from 'lodash-es'

export default ({ store }) => {
  const setViewportSize = () => {
    store.commit('ui/setViewportSize', [window.innerWidth, window.innerHeight])
  }

  setViewportSize()

  window.addEventListener('resize', debounce(setViewportSize, 16))
}
