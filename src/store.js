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
    getPc: (state) => { return state.pc },
    campaignIsSet: state => !!state.campaign,
    pcList: state => state.pcs,
    userName: (state) => {return state.user.username}
    // hasClass: state => state.pcs.filter(pc => !!pc.pcClass)

  },
  mutations: 
    {
    setUsers(state, users) {
      state.users = users;
    },
    setUser(state, user) {
      state.user = user;
    },
    setCampaign(state, campaign){
      state.campaign = campaign;
    },
    setCampaigns(state, campaigns){
      state.campaigns = campaigns;
    },
    setPcs(state, pcs){
      state.pcs = pcs;
    },
    setPc(state, pc) {
      state.pc = pc;
    },
    setNull(state, payload){
      state.payload = payload
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
    async setCurrentCampaign({ commit }, payload){
      const response = await axios.post('/setCurrentCampaign', payload);
        commit('setCampaign', response.data);
    },
    async loadCurrentCampaign({ commit }, payload)  {
      const response = await axios.get('/loadCurrentCampaign', payload);
       commit('setCampaign', response.data);
    },
    dismiss({ commit }) {
      () => commit('setNull', '');
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
    async updateCampaign({ commit }, payload){
      const response = await axios.post('/updateCampaign', payload)
      commit('setCampaign', response.data);
    },
    async AddPc({ commit }, payload){
      const response = await axios.post('/addPc', payload)
      commit('setPcs', response.data);
    },
    async deleteCampaign({ commit }, payload){
      const response = await axios.post('/deleteCampaign', payload)
      commit('setCampaign', response.data);
    },

    async setPc({ commit }, payload){
      const response = await axios.post('/pcs/setPc', payload)
      commit('setPc', response.data);
    },
    
    async setPcNull({ commit }){
      const response = null;
      commit('setPc', response);
    },
    async getPcs({ commit }, payload) {
      const response = await axios.get('/pcs', payload);
      commit('setPcs', response.data);
    },
    async updatePc({ commit }, payload){
      const response = await axios.post('/pcs/updatePc', payload)
      commit('setPc', response.data);
    },
    async updatePcImage({ commit }, payload){
      const response = await axios.post('/pcs/updatePcImage', payload)
      commit('setPc', response.data);
    },
    async updatePcWithImage({ commit }, payload){
      const response = await axios.post('/pcs/updatePcImage', payload)
      commit('setPc', response.data);
    },
    async deletePc({ commit }, payload){
      const response = await axios.post('/pcs/deletePc', payload)
      commit('setPc', response.data);
    }
  }
})
