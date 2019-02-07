export default function({ store }) {
  window.addEventListener('keyup', event => {
    if (event.keyCode === 27) store.dispatch('ui/hideAllOverlayElements')
  })
}
