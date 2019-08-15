<template>
    <div class="campaign-container-content" >   
        <p>Choose a campaign below to load your data.</p>
        <div v-for="(campaign) in loadCampaigns" v-bind:key="campaign.id">
            <div class="box" id="campaigns">
                <div class="columns is-mobile">
                    <div class="column is-one-third">
                        <h2 class="title" >{{ campaign.title }}</h2>
                        <p class="campaign-description">{{ campaign.title }}</p>
                        <button class="button" @click="setCurrentCampaign(campaign)">Set to Current</button>
                    </div>
                    <div class="column">
                        <div class="campaign-thumbnails">
                            <div class="campaign-thumbnail" v-for="thumbnail in campaign.thumbnails" v-bind:key="thumbnail">
                                <!-- <figure class="image is-is-square"> -->
                                    <img v-if="thumbnail !== null"  :src='thumbnail' />
                                    <img v-else src='../../assets/images/thumbnail-default.png'/>
                                <!-- </figure> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "ListCampaigns",
    computed: {
        ...mapGetters([
            'getCampaigns',
        ]),
        loadCampaigns(){
            // return this.$store.state.campaigns;
            return this.$store.state.campaignThumbnails;
        },
        loadPcs(){
            return this.$store.state.pcs;
        }
    },
    data(){
        return{
            collapsed: true,
            title: '',
            description: ''
        }
    },
    methods: {
       async setCurrentCampaign (campaign) {
        await this.$store.dispatch('setCurrentCampaign', campaign)
            .then(() => {
            return this.$store.dispatch('getPcs')
            })
            .then(() => {
            return this.$store.dispatch('getNpcs')
            })
            .then(() => {
            return this.$store.dispatch('getLocations')
            })
        },
        async updateCampaign(campaign){
            await this.$store.dispatch('updateCampaign', campaign)
        }
    }
}

</script>
<style lang="scss">
.campaign-thumbnails{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: right;
    height: 100%;
    overflow: hidden;
}
.campaign-thumbnail img{
    height: 80px;
    width: 80px;
//    float: left;
}
</style>
