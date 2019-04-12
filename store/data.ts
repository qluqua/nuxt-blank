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
      const data = await this.$axios.$get('https://jsonplaceholder.typicode.com/todos/1')
      console.log(data)
      commit('saveTestData', data.title)
    } catch (error) {
      commit('saveTestData', error.message)
    }
  }
}
