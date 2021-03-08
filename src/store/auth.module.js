import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user_and_jwt) {
      return AuthService.login(user_and_jwt).then(
        user => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },
        error => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    userUpdate({ commit }, user) {
      AuthService.userUpdate(user);
      commit("userUpdate", user);
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    userUpdate(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    }
  }
};
