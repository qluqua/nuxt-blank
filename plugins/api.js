import Vue from 'vue' // eslint-disable-line
import { entries } from '@/utils';
import * as providers from '@/api/providers';

export default function({ app: { $axios } }, inject) {
  const $api = {};

  entries(providers).forEach((providerEntry) => {
    const providerName = providerEntry[0];
    const providerFunction = providerEntry[1]($axios);

    $api[providerName] = providerFunction;
  });

  Vue.prototype.$api = $api;
  inject('api', $api);
}
