export default context => {
  const { store } = context

  store.dispatch('ui/hideAllOverlayElements')
}
