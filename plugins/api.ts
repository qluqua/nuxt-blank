import Vue from 'vue'
import { entries } from '@/utils'
import * as providers from '@/api/providers'

export default function api({ app: { $axios } }, inject) {
  const $api = {}

  entries(providers).forEach((providerEntry) => {
    const providerName = providerEntry[0]
    const providerFunction = providerEntry[1]($axios)

    $api[providerName] = providerFunction
  })

  try {
    Vue.prototype.$api = $api
  } catch(error) {
    // console.log(error);
  }

  inject('api', $api)
}
