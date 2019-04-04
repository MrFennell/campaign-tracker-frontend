import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    pcs: [],
    pc: null
  },
  getters: {
    isLoggedIn: state => !!state.user
  },
  mutations: 
    {

    // setPc(state, payload) {
    //   state.pc.push(payload);
    // },
    setPc(state, pc) {
      state.pc = pc;
    },
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    }
    ,
    setPcs(state, pcs){
      state.pcs = pcs;
    }
  },
  actions: {
    async getUsers({ commit }) {
      const response = await axios.get('/users');
      commit('setUsers', response.data);
    },
    async register({ commit }, payload) {
      const response = await axios.post('/users/register', payload);
      commit('setUser', response.data);
    },
    async AddPc({ commit }, payload){
      const response = await axios.post('/addPc', payload)
      commit('setPc', response.data);
    },
    async getPcs({ commit }, payload) {
      const response = await axios.get('/pcs', payload);
      commit('setPcs', response.data);
    },
    login({ commit }, payload) {
      return axios.post('/users/login', payload)
        .then(response => commit('setUser', response.data));
    },
    logout({ commit }) {
      return axios.post('/users/logout')
        .then(() => commit('setUser', null));
    },
    loadcurrentuser({ commit }) {
      axios.get('/users/current')
        .then(response => commit('setUser', response.data));
    },
    loadPc({ commit }, payload) {
      axios.get(`/pcs/${payload}`)
        .then(response => commit('setPc', response.data));
    },
  }
})
