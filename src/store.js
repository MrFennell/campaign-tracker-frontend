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
    locations: [],
    relationships: []
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
    userName: (state) => {return state.user.username},
    
    PcRelationships:state =>{
      const relationships = state.relationships;
      const rArray = []

      const PcRelationshipsBoth = relationships.filter(relationships => relationships.PcId !== null && relationships.PcId2 !== null)
      for(let i = 0; i< PcRelationshipsBoth.length; i++){
        let currentR = PcRelationshipsBoth[i];
        let pcLookup = state.pcs.find(pc => pc.id === currentR.PcId)
        if(pcLookup){
          currentR.PcName = pcLookup['pcName'];
        }
        let pcLookup2 = state.pcs.find(pc => pc.id === currentR.PcId2)
        if(pcLookup2){
          currentR.PcName2 = pcLookup2['pcName'];
        }
        rArray.push(currentR)
      }

      const PcRelationships1= relationships.filter(relationships => relationships.PcId !== null && relationships.PcId2 === null)
      for(let i = 0; i< PcRelationships1.length; i++){
        let currentR = PcRelationships1[i];
        let pcLookup = state.pcs.find(pc => pc.id === currentR.PcId)
        if(pcLookup){
          currentR.PcName = pcLookup['pcName'];
        }
        rArray.push(currentR)
      }

      const PcRelationships2= relationships.filter(relationships => relationships.PcId === null && relationships.PcId2 !== null)
      for(let i = 0; i< PcRelationships2.length; i++){
        let currentR = PcRelationships2[i];
        let pcLookup = state.pcs.find(pc => pc.id === currentR.PcId)
        if(pcLookup){
          currentR.PcName = pcLookup['pcName'];
        }
        rArray.push(currentR)
      }
      return rArray;
    },

    NpcRelationships:state =>{
      const relationships = state.relationships;
      const rArray = []
      
      const NpcRelationshipsBoth = relationships.filter(relationships => relationships.NpcId !== null && relationships.NpcId2 !== null)
      for(let i = 0; i < NpcRelationshipsBoth.length; i++){
        let currentR = NpcRelationshipsBoth[i];
        let lookup = state.npcs.find(npc => npc.id === currentR.NpcId)
        if(lookup){
          currentR.NpcName = lookup['name'];
        }
        let lookup2 = state.npcs.find(npc => npc.id === currentR.NpcId2)
        if(lookup2){
          currentR.NpcName2 = lookup2['name'];
        }
        rArray.push(currentR)
      }
      
      const NpcRelationships1 = relationships.filter(relationships => relationships.NpcId !== null && relationships.NpcId2 === null)
      for(let i = 0; i < NpcRelationships1.length; i++){
        let currentR = NpcRelationships1[i];
        let lookup = state.npcs.find(npc => npc.id === currentR.NpcId)
        if(lookup){
          currentR.NpcName = lookup['name'];
        }
        rArray.push(currentR)
      }

      const NpcRelationships2 = relationships.filter(relationships => relationships.NpcId === null && relationships.NpcId2 !== null)
      for(let i = 0; i < NpcRelationships2.length; i++){
        let currentR = NpcRelationships2[i];
        let lookup = state.npcs.find(npc => npc.id === currentR.NpcId2)
        if(lookup){
          currentR.NpcName2 = lookup['name'];
        }
        rArray.push(currentR)
      }
     
      return rArray;
    },
    LocationRelationships:state =>{
      const relationships = state.relationships;
      const rArray = []
      
      const LocationRelationshipsBoth = relationships.filter(relationships => relationships.LocationId !== null && relationships.LocationId2 !== null)
      for(let i = 0; i < LocationRelationshipsBoth.length; i++){
        let currentR = LocationRelationshipsBoth[i];
        let lookup = state.locations.find(location => location.id === currentR.LocationId)
        if(lookup){
          currentR.LocationName = lookup['name'];
        }
        let lookup2 = state.locations.find(location => location.id === currentR.LocationId2)
        if(lookup2){
          currentR.LocationName2 = lookup2['name'];
        }
        rArray.push(currentR)
      }
      
      const LocationRelationships1 = relationships.filter(relationships => relationships.LocationId !== null && relationships.LocationId2 === null)
      for(let i = 0; i < LocationRelationships1.length; i++){
        let currentR = LocationRelationships1[i];
        let lookup = state.locations.find(location => location.id === currentR.LocationId)
        if(lookup){
          currentR.LocationName = lookup['name'];
        }
        rArray.push(currentR)
      }

      const LocationRelationships2 = relationships.filter(relationships => relationships.LocationId === null && relationships.LocationId2 !== null)
      for(let i = 0; i < LocationRelationships2.length; i++){
        let currentR = LocationRelationships2[i];
        let lookup = state.locations.find(location => location.id === currentR.LocationId2)
        if(lookup){
          currentR.LocationName2 = lookup['name'];
        }
        rArray.push(currentR)
      }
     
      return rArray;
    }
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
    setRelationships(state, relationships){
      state.relationships = relationships;
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
    /////////////pcs
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
    },
    //////////Relationships
    loadRelationships( store ) {
      axios.get('/api/relationships')
        .then(response => { 
        store.commit('setRelationships', response.data);
      })
    },
    async deleteRelationship({ commit }, payload){
      const response = await axios.post('/api/relationships/deleteRelationship', payload)
      commit('setRelationships', response.data);
    },
    async addPcPcRelationship({ commit }, payload){
      const response = await axios.post('/api/relationships/addPcPcRelationship', payload)
      commit('setRelationships', response.data);
    },
    async addPcNpcRelationship({ commit }, payload){
      const response = await axios.post('/api/relationships/addPcNpcRelationship', payload)
      commit('setRelationships', response.data);
    },
    async addPcLocationRelationship({ commit }, payload){
      const response = await axios.post('/api/relationships/addPcLocationRelationship', payload)
      commit('setRelationships', response.data);
    },
    async addNpcNpcRelationship({ commit }, payload){
      const response = await axios.post('/api/relationships/addNpcNpcRelationship', payload)
      commit('setRelationships', response.data);
    },
    async addNpcLocationRelationship({ commit }, payload){
      const response = await axios.post('/api/relationships/addNpcLocationRelationship', payload)
      commit('setRelationships', response.data);
    }
  }
})
