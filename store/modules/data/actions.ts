import axios from 'axios'

export default {
  async getTestData({ commit }) {
    try {
      const data = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      // const data = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      debugger
      commit('saveTestData', data.data)
    } catch(e) {
      console.error(e)
    }
  }
}
