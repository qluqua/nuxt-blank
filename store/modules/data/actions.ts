import axios from 'axios'

export default {
  async getTestData({ commit }) {
    const data = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

    commit('saveTestData', data)
  }
}
