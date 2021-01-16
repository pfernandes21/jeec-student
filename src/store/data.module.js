import UserService from "../services/user.service";

const state = {
  levels
  rewards
  stuff

};

const getters = {
  getLevels: (state) => state.levels
  getStuff
};

const actions = {
  fetchLevels({ commit }) {
    UserService.getLevels().then((response) => commit('setLevels', response.data.data));
  }

  addTodo({ commit }, params) {
    response= post(params);
    commit('newTodo', response.data);
  }
};

const mutations = {
  setLevels: (state, levels) => (state.levels = levels),
  newTodo: (state, todo) => state.todos.push(todo)
};

export default {
  state,
  getters,
  actions,
  mutations
};