import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    campaign: null,
    campaigns: [],
    pcs: [],
    pc: null
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUserId: (state) => { return state.user.id},
    campaignIsSet: state => !!state.campaign
  },
  mutations: 
    {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setCampaign(state, payload){
      state.campaign = payload;
    },
    setCampaigns(state, payload){
      state.campaigns = payload;
    },
    setPcs(state, pcs){
      state.pcs = pcs;
    },
    setPc(state, pc) {
      state.pc = pc;
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
    login({ commit }, payload) {
      return axios.post('/users/login', payload)
        .then(response => commit('setUser', response.data));
    },
    setCurrentCampaign({ commit }, payload){
      axios.post('/setCurrentCampaign', payload)
        .then(response => commit('setCampaign', response.data));
    },
    loadCurrentCampaign({ commit }) {
      return axios.get('/loadCurrentCampaign')
       .then(response => commit('setCampaign', response.data));
   },
    logout({ commit }) {
      return axios.post('/users/logout')
        .then(() => commit('setUser', null));
    },
    loadcurrentuser({ commit }) {
      axios.get('/users/current')
        .then(response => commit('setUser', response.data));
    },
    
    loadCampaign({ commit }, payload) {
      axios.get(`/campaigns/${payload}`)
        .then(response => commit('setCampaign', response.data));
    },
    loadCampaigns( store ) {
      axios.get('/campaigns')
        .then(response => { 
        store.commit('setCampaigns', response.data);
      });
    },
    loadPcs( store ) {
      axios.get('/pcs')
        .then(response => { 
        store.commit('setPcs', response.data);
      });
    },
    loadPc({ commit }, payload) {
      axios.get(`/pcs/${payload}`)
        .then(response => commit('setPc', response.data));
    },
    getCampaigns( {commit} , payload) {
      axios.get('/campaigns', payload)
        .then(response => commit('setCampaigns', response.data));
    },
    async AddCampaign({ commit }, payload){
      const response = await axios.post('/addCampaign', payload)
      commit('setCampaign', response.data);
    },
    async AddPc({ commit }, payload){
      const response = await axios.post('/addPc', payload)
      commit('setPc', response.data);
    },
    async getPcs({ commit }, payload) {
      const response = await axios.get('/pcs', payload);
      commit('setPcs', response.data);
    },
    async updatePc({ commit }, payload){
      const response = await axios.post('/updatePc', payload)
      commit('setPc', response.data);
    },
    async deletePc({ commit }, payload){
      const response = await axios.post('/deletePc', payload)
      commit('setPc', response.data);
    }
  }
})
