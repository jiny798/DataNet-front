import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
  },
  getters: {
    isLogin(state) {
      return state.nickname !== '';
    },
  },
  mutations: {
    setUsername(state, nickname) {
      state.nickname = nickname;
    },
    clearUsername(state) {
      state.nickname = '';
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data);
      commit('setToken', data.data.token);
      commit('setUsername', data.data.nickname);
      saveAuthToCookie(data.data.token);
      saveUserToCookie(data.data.nickname);
      return data;
    },
  },
});
