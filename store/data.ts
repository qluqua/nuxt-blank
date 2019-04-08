import axios from 'axios'

export const state = () => ({
  test: null
})

export const getters = {

}

export const mutations = {

}

export const actions = {
  async getTestData({ commit }) {
    try {
      const { data } = await axios.get(process.env.baseUrl + 'https://jsonplaceholder.typicode.com/todos/1')
      commit('saveTestData', data.title)
    } catch (error) {
      commit('saveTestData', error.message)
    }
  }
}
