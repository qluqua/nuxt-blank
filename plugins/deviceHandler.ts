import device from 'current-device'

export default function({ store }) {
  store.commit('ui/setPlatform', device.type)
  store.commit('ui/setOs', device.os)
}
