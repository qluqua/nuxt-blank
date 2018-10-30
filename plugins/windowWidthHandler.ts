import debounce from 'lodash.debounce'

export default ({ store }) => {
  const updateWindowWidth = () => {
    store.commit('ui/updateWindowWidth', window.innerWidth)
  }

  updateWindowWidth()

  window.addEventListener('resize', debounce(updateWindowWidth, 100))
}
