import device from 'current-device'

export default function({ store }) {
  store.commit('ui/setPlatform', device.type)
  store.commit('ui/setOs', device.os)

  const isIe = /*@cc_on!@*/false || !!document['documentMode'] // Internet Explorer 6-11
  const isEdge = !isIe && !!window['StyleMedia'] // Edge 20+

  if (isIe) {
    document.documentElement.classList.add('is-ie')
    store.commit('ui/isIe')
  }

  if (isEdge) {
    document.documentElement.classList.add('is-edge')
    store.commit('ui/isEdge')
  }
}
