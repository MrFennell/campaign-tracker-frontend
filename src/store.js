import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
  state: {
    user: null,
    users: [],
    campaign: '',
    campaigns: [],
    pcs: [],
    pc: '',
    npcs: [],
    npc: '',
    location: '',
    locations: []
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUserId: (state) => { return state.user.id},
    getCampaignId:(state) => { return state.campaign.id },
    getCampaignById: (state) => (id) =>{ 
      return state.campaigns.find(campaign => campaign.id === id); 
    },
    getPcId:(state) => { return state.pc.id },
    getPcById: (state) => (id) =>{ 
      return state.pcs.find(pc => pc.id === id); 
    },
    getNpcId:(state) => { return state.npc.id },
    getNpcById: (state) => (id) =>{ 
      return state.npcs.find(npc => npc.id === id); 
    },
    getLocationId:(state) => { return state.location.id },
    getLocationById: (state) => (id) =>{ 
      return state.locations.find(location => location.id === id); 
    },
    campaignIsSet: state => !!state.campaign,
    userName: (state) => {return state.user.username}

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
    setNpcs(state, npcs){
      state.npcs = npcs;
    },
    setNpc(state, npc) {
      state.npc = npc;
    },
    setLocations(state, locations){
      state.locations = locations;
    },
    setLocation(state, location) {
      state.location = location;
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
    async setCampaignNull({ commit }){
      const response = '';
      commit('setCampaignNull', response);
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
    getCampaigns( {commit} , payload) {
      axios.get('/campaigns', payload)
        .then(response => commit('setCampaigns', response.data));
    },
    async AddCampaign({ commit }, payload){
      const response = await axios.post('/addCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async updateCampaign({ commit }, payload){
      const response = await axios.post('/updateCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async deleteCampaign({ commit }, payload){
      const response = await axios.post('/deleteCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async setPc({ commit }, payload){
      commit('setPc', payload);
    },
    // async setPc({ commit }, payload){
    //   const response = await axios.post('/pcs/setPc', payload)
    //   commit('setPc', response.data);
    // },
    async setPcNull({ commit }){
      const response = '';
      commit('setPc', response);
    },
    async getPcs({ commit }, payload) {
      const response = await axios.get('/pcs', payload);
      commit('setPcs', response.data);
    },
    async addPc({ commit }, payload){
      const response = await axios.post('/pcs/addPc', payload)
      commit('setPcs', response.data);
    },
    async addPcWithImage({ commit }, payload){
      const response = await axios.post('/pcs/addPcWithImage', payload)
      commit('setPcs', response.data);
    },
    async updatePc({ commit }, payload){
      const response = await axios.post('/pcs/updatePc', payload)
      commit('setPcs', response.data);
    },
    async updatePcImage({ commit }, payload){
      const response = await axios.post('/pcs/updatePcImage', payload)
      commit('setPcs', response.data);
    },
    async updatePcWithImage({ commit }, payload){
      const response = await axios.post('/pcs/updatePcWithImage', payload)
      commit('setPcs', response.data);
    },
    async deletePc({ commit }, payload){
      const response = await axios.post('/pcs/deletePc', payload)
      commit('setPcs', response.data);
    },
    loadNpcs( store ) {
      axios.get('/npcs')
        .then(response => { 
        store.commit('setNpcs', response.data);
      });
    },
    async setNpc({ commit }, payload){
      commit('setNpc', payload);
    },
    async setNpcNull({ commit }){
      const response = '';
      commit('setNpc', response);
    },
    async getNpcs({ commit }, payload) {
      const response = await axios.get('/npcs', payload);
      commit('setNpcs', response.data);
    },
    async addNpc({ commit }, payload){
      const response = await axios.post('/npcs/addNpc', payload)
      commit('setNpcs', response.data);
    },
    async addNpcWithImage({ commit }, payload){
      const response = await axios.post('/npcs/addNpcWithImage', payload)
      commit('setNpcs', response.data);
    },
    async updateNpc({ commit }, payload){
      const response = await axios.post('/npcs/updateNpc', payload)
      commit('setNpcs', response.data);
    },
    async updateNpcImage({ commit }, payload){
      const response = await axios.post('/npcs/updateNpcImage', payload)
      commit('setNpcs', response.data);
    },
    async updateNpcWithImage({ commit }, payload){
      const response = await axios.post('/npcs/updateNpcWithImage', payload)
      commit('setNpcs', response.data);
    },
    async deleteNpc({ commit }, payload){
      const response = await axios.post('/npcs/deleteNpc', payload)
      commit('setNpcs', response.data);
    },

    ///locations
    loadLocations( store ) {
      axios.get('/locations')
        .then(response => { 
        store.commit('setLocations', response.data);
      });
    },
    async setLocation({ commit }, payload){
      commit('setLocation', payload);
    },
    async setLocationNull({ commit }){
      const response = '';
      commit('setLocation', response);
    },
    async getLocations({ commit }, payload) {
      const response = await axios.get('/locations', payload);
      commit('setLocations', response.data);
    },
    async addLocation({ commit }, payload){
      const response = await axios.post('/locations/addLocation', payload)
      commit('setLocations', response.data);
    },
    async addLocationWithImage({ commit }, payload){
      const response = await axios.post('/locations/addLocationWithImage', payload)
      commit('setLocations', response.data);
    },
    async updateLocation({ commit }, payload){
      const response = await axios.post('/locations/updateLocation', payload)
      commit('setLocations', response.data);
    },
    async updateLocationImage({ commit }, payload){
      const response = await axios.post('/locations/updateLocationImage', payload)
      commit('setLocations', response.data);
    },
    async updateLocationWithImage({ commit }, payload){
      const response = await axios.post('/locations/updateNpcWithImage', payload)
      commit('setLocations', response.data);
    },
    async deleteLocation({ commit }, payload){
      const response = await axios.post('/locations/deleteLocation', payload)
      commit('setLocations', response.data);
    }
    
  }
})
