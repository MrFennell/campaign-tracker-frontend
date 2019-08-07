import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'
// const headers = {'X-Requested-With': 'XMLHttpRequest'}
// const config = {
//   headers: {'Access-Control-Allow-Origin': '*'}
// }
export default new Vuex.Store({
  state: {
    user: '',
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
    getCampaigns:(state) => {return state.campaigns},
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
      const response = await axios.get('http://campaign-tracker-server.fennellweb.com/users');
      commit('setUsers', response.data);
    },
    async register({ commit }, payload) {
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/users/register', payload);
      commit('setUser', response.data);
    },
    // async login({ commit }, payload) {
    //   const response = await axios.post('/users/login', payload)
    //     commit('setUser', response.data);
    // },
    logout({ commit }) {
      return axios.post('http://campaign-tracker-server.fennellweb.com/users/logout')
        .then(() => commit('setUser', ''));
    },
    login({ commit }, payload) {
      return axios.post('http://campaign-tracker-server.fennellweb.com/users/login', payload)
        .then(response => commit('setUser', response.data));
    },
    async setCurrentCampaign({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/setCurrentCampaign', payload);
        commit('setCampaign', response.data);
    },
    async setCampaignNull({ commit }){
      const response = '';
      commit('setCampaignNull', response);
    },
    async loadCurrentCampaign({ commit }, payload)  {
      const response = await axios.get('http://campaign-tracker-server.fennellweb.com/loadCurrentCampaign', payload);
       commit('setCampaign', response.data);
    },
    dismiss({ commit }) {
      () => commit('setNull', '');
    },

    async loadcurrentuser({ commit }) {
      axios.get('http://campaign-tracker-server.fennellweb.com/users/current')
        .then(response => commit('setUser', response.data));
    },
    loadCampaign({ commit }, payload) {
      axios.get(process.env.VUE_APP_BASEURL+`/campaigns/${payload}`)
        .then(response => commit('setCampaign', response.data));
    },
    loadCampaigns( store ) {
      axios.get('http://campaign-tracker-server.fennellweb.com/campaigns')
        .then(response => { 
        store.commit('setCampaigns', response.data);
      });
    },
    loadPcs( store ) {
      axios.get('http://campaign-tracker-server.fennellweb.com/pcs')
        .then(response => { 
        store.commit('setPcs', response.data);
      });
    },
    getCampaigns( {commit} , payload) {
      axios.get('http://campaign-tracker-server.fennellweb.com/campaigns', payload)
        .then(response => commit('setCampaigns', response.data));
    },
    async AddCampaign({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/addCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async updateCampaign({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/updateCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async deleteCampaign({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/deleteCampaign', payload)
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
      const response = await axios.get('http://campaign-tracker-server.fennellweb.com/pcs', payload);
      commit('setPcs', response.data);
    },
    async addPc({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/pcs/addPc', payload)
      commit('setPcs', response.data);
    },
    async addPcWithImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/pcs/addPcWithImage', payload)
      commit('setPcs', response.data);
    },
    async updatePc({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/pcs/updatePc', payload)
      commit('setPcs', response.data);
    },
    async updatePcImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/pcs/updatePcImage', payload)
      commit('setPcs', response.data);
    },
    async updatePcWithImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/pcs/updatePcWithImage', payload)
      commit('setPcs', response.data);
    },
    async deletePc({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/pcs/deletePc', payload)
      commit('setPcs', response.data);
    },
    loadNpcs( store ) {
      axios.get('http://campaign-tracker-server.fennellweb.com/npcs')
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
      const response = await axios.get('http://campaign-tracker-server.fennellweb.com/npcs', payload);
      commit('setNpcs', response.data);
    },
    async addNpc({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/npcs/addNpc', payload)
      commit('setNpcs', response.data);
    },
    async addNpcWithImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/npcs/addNpcWithImage', payload)
      commit('setNpcs', response.data);
    },
    async updateNpc({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/npcs/updateNpc', payload)
      commit('setNpcs', response.data);
    },
    async updateNpcImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/npcs/updateNpcImage', payload)
      commit('setNpcs', response.data);
    },
    async updateNpcWithImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/npcs/updateNpcWithImage', payload)
      commit('setNpcs', response.data);
    },
    async deleteNpc({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/npcs/deleteNpc', payload)
      commit('setNpcs', response.data);
    },

    ///locations
    loadLocations( store ) {
      axios.get('http://campaign-tracker-server.fennellweb.com/locations')
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
      const response = await axios.get('http://campaign-tracker-server.fennellweb.com/locations', payload);
      commit('setLocations', response.data);
    },
    async addLocation({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/locations/addLocation', payload)
      commit('setLocations', response.data);
    },
    async addLocationWithImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/locations/addLocationWithImage', payload)
      commit('setLocations', response.data);
    },
    async updateLocation({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/locations/updateLocation', payload)
      commit('setLocations', response.data);
    },
    async updateLocationImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/locations/updateLocationImage', payload)
      commit('setLocations', response.data);
    },
    async updateLocationWithImage({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/locations/updateNpcWithImage', payload)
      commit('setLocations', response.data);
    },
    async deleteLocation({ commit }, payload){
      const response = await axios.post('http://campaign-tracker-server.fennellweb.com/locations/deleteLocation', payload)
      commit('setLocations', response.data);
    }
    
  }
})
