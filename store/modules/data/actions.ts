import axios from 'axios'

export default {
  getTestData({ commit }) {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(data => { commit('saveTestData', data.data) })
      .catch(error => { commit('saveTestData', { title: error.message }) })
  }
}
