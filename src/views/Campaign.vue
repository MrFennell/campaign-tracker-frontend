<template>
    <div class="content">
        <p v-if="campaign.title">Campaign: {{ campaign.title }}</p>
        <p v-else>Untitled</p>
        <p v-if="campaign.description">Description: {{campaign.description}}</p>
        <p v-else>(no details)</p>
        <button @click="setCurrentCampaign">Set Current Campaign</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'campaign',
    data() {
        return {
            campaign: {}
        };
    },
    async mounted() {
        const response = await axios.get(`/campaigns/${this.$route.params.id}`);
        this.campaign = response.data;
    },
    methods:{
        setCurrentCampaign(){
            console.log("campaign.vue "+this.campaign); 
            this.$store.dispatch('setCurrentCampaign', this.campaign);
        }
    }
}
</script>

<style>


</style>
