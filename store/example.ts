export const state = () => ({
  exampleState: {},
});

export const mutations = {
  saveExampleState(state, payload) {
    state.exampleState = payload;
  },
};

export const actions = {
  async fetchExampleAction({ commit }, payload) {
    const data = await this.$api.fetchExample(payload);

    commit('saveExampleState', data);
  },
};
