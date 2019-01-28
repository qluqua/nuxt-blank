import device from 'current-device'
import { detect } from 'detect-browser'

export default function({ store }) {
  store.commit('ui/setDeviceType', device.type)
  store.commit('ui/setBrowser', detect())

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
