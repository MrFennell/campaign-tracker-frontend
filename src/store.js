import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = process.env.VUE_APP_URL;

export default new Vuex.Store({
  state: {
    user: '',
    users: [],
    campaign: '',
    campaigns: [],
    campaignThumbnails: [],
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
    setCampaignThumbnails(state, campaignThumbnails){
      state.campaignThumbnails = campaignThumbnails;
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
      const response = await axios.get('/api/users');
      commit('setUsers', response.data);
    },
    async register({ commit }, payload) {
      const response = await axios.post('/api/users/register', payload);
      commit('setUser', response.data);
    },
    // async login({ commit }, payload) {
    //   const response = await axios.post('/api/users/login', payload)
    //     commit('setUser', response.data);
    // },
    logout({ commit }) {
      return axios.post('/api/users/logout')
        .then(() => commit('setUser', ''));
    },
    login({ commit }, payload) {
      return axios.post('/api/users/login', payload)
        .then(response => commit('setUser', response.data));
    },
    async setCurrentCampaign({ commit }, payload){
      const response = await axios.post('/api/setCurrentCampaign', payload);
        commit('setCampaign', response.data);
    },
    async setCampaignNull({ commit }){
      const response = '';
      commit('setCampaignNull', response);
    },
    async loadCurrentCampaign({ commit }, payload)  {
      const response = await axios.get('/api/loadCurrentCampaign', payload);
       commit('setCampaign', response.data);
    },
    dismiss({ commit }) {
      () => commit('setNull', '');
    },

    async loadcurrentuser({ commit }) {
      axios.get('/api/users/current')
        .then(response => commit('setUser', response.data));
    },
    loadCampaign({ commit }, payload) {
      axios.get(`/campaigns/${payload}`)
        .then(response => commit('setCampaign', response.data));
    },
    loadCampaigns( store ) {
      axios.get('/api/campaigns')
        .then(response => { 
        store.commit('setCampaigns', response.data);
      });
    },
    loadPcs( store ) {
      axios.get('/api/pcs')
        .then(response => { 
        store.commit('setPcs', response.data);
      });
    },
    getCampaigns( {commit} , payload) {
      axios.get('/api/campaigns', payload)
        .then(response => commit('setCampaigns', response.data));
    },
    async AddCampaign({ commit }, payload){
      const response = await axios.post('/api/addCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async updateCampaign({ commit }, payload){
      const response = await axios.post('/api/updateCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async deleteCampaign({ commit }, payload){
      const response = await axios.post('/api/deleteCampaign', payload)
      commit('setCampaigns', response.data);
    },
    async setPc({ commit }, payload){
      commit('setPc', payload);
    },
    async campaignThumbnails({ commit }, payload){
      const response = await axios.get('/api/campaignThumbnails', payload)
      commit('setCampaignThumbnails', response.data);
    },
    async setPcNull({ commit }){
      const response = '';
      commit('setPc', response);
    },
    async getPcs({ commit }, payload) {
      const response = await axios.get('/api/pcs', payload);
      commit('setPcs', response.data);
    },
    async addPc({ commit }, payload){
      const response = await axios.post('/api/pcs/addPc', payload)
      commit('setPcs', response.data);
    },
    async updatePc({ commit }, payload){
      const response = await axios.post('/api/pcs/updatePc', payload)
      commit('setPcs', response.data);
    },
    async updatePcImage({ commit }, payload){
      const response = await axios.post('/api/pcs/updatePcImage', payload)
      commit('setPcs', response.data);
    },
    async deletePc({ commit }, payload){
      const response = await axios.post('/api/pcs/deletePc', payload)
      commit('setPcs', response.data);
    },
    loadNpcs( store ) {
      axios.get('/api/npcs')
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
      const response = await axios.get('/api/npcs', payload);
      commit('setNpcs', response.data);
    },
    async addNpc({ commit }, payload){
      const response = await axios.post('/api/npcs/addNpc', payload)
      commit('setNpcs', response.data);
    },
    async updateNpc({ commit }, payload){
      const response = await axios.post('/api/npcs/updateNpc', payload)
      commit('setNpcs', response.data);
    },
    async updateNpcImage({ commit }, payload){
      const response = await axios.post('/api/npcs/updateNpcImage', payload)
      commit('setNpcs', response.data);
    },
    async deleteNpc({ commit }, payload){
      const response = await axios.post('/api/npcs/deleteNpc', payload)
      commit('setNpcs', response.data);
    },

    ///locations
    loadLocations( store ) {
      axios.get('/api/locations')
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
      const response = await axios.get('/api/locations', payload);
      commit('setLocations', response.data);
    },
    async addLocation({ commit }, payload){
      const response = await axios.post('/api/locations/addLocation', payload)
      commit('setLocations', response.data);
    },
    async updateLocation({ commit }, payload){
      const response = await axios.post('/api/locations/updateLocation', payload)
      commit('setLocations', response.data);
    },
    async updateLocationImage({ commit }, payload){
      const response = await axios.post('/api/locations/updateLocationImage', payload)
      commit('setLocations', response.data);
    },
    async deleteLocation({ commit }, payload){
      const response = await axios.post('/api/locations/deleteLocation', payload)
      commit('setLocations', response.data);
    }
  }
})
