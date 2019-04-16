<template>
    <div class="content">
        <h2>Campaigns</h2>
            <ul>
                <li v-for="campaign in campaigns" v-bind:key="campaign.id">
                    <div class="box">
                        <router-link :to="{ name: 'campaign', params: { id: campaign.id }}"><h3>{{ campaign.title }}</h3></router-link>
                        <p>{{ campaign.description }}</p>
                        <p>GM:</p>
                        <p>Players:</p>
                        <button class="button" @click="setCurrentCampaign(campaign)">Set Current Campaign</button>
                    </div>
                </li>
            </ul>
       </div>
    
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'campaigns',
    computed: mapState(['campaigns']),
    mounted() {
        this.$store.dispatch('getCampaigns');
    }
    // ,
    // methods: {
    //     setCurrentCampaign(campaign){
    //         this.$store.dispatch('setCurrentCampaign', this.campaign);
    //     }
    // }

}
</script>

<style>

</style>
