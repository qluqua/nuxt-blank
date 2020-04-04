import { Logger } from '@/utils'

const logger = new Logger({
  prefix: '[countriesProvider]',
  condition: true,
})
const URL_COUNTRIES_API = 'https://restcountries.eu/rest/v2/all'
const URL_SEND_ROADMAP_API = 'https://jsonplaceholder.typicode.com/posts'

export function fetchCountries($axios) {
  return async function() {
    try {
      const { data } = await $axios.get(URL_COUNTRIES_API)
      const dataMapped = data.map(item => ({
        name: item.name as string,
        flag: item.flag as string,
      }))

      return dataMapped
    } catch (error) {
      logger.error(error)
    }
  }
}

export function sendRoadmap($axios, roadmapKeys) {
  return async function() {
    try {
      const response = await $axios.post(URL_SEND_ROADMAP_API, roadmapKeys)

      return response
    } catch (error) {
      logger.error(error)
    }
  }
}
