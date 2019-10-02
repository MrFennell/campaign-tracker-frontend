<template>
    <div class="container-content" >   
        <p>Choose a campaign below to load your data.</p>
        <div v-for="(campaign) in loadCampaigns" v-bind:key="campaign.id">
            <div class="box" id="campaigns">
                <div class="columns is-mobile">
                    <!-- <div class="column is-one-third">
                        <h2 class="title" >{{ campaign.title }}</h2>
                        <p class="campaign-description">{{ campaign.description }}</p>
                        <button class="button" @click="setCurrentCampaign(campaign)">Set to Current</button>
                    </div> -->
                    <div class="column is-one-third">
                        <CampaignHeader 
                            v-bind:title="campaign.title"
                            v-bind:description="campaign.description"
                        ></CampaignHeader>
                        <button v-if="currentCampaignId !== campaign.id" class="button" @click="setCurrentCampaign(campaign)">Set to Current</button>
                    </div>
                    <div class="column">
                        <div class="campaign-thumbnails">
                            <div class="campaign-thumbnail" v-for="thumbnail in campaign.thumbnails" v-bind:key="thumbnail.id">
                                <img v-if="thumbnail !== '' && thumbnail !== null"  :src="'https://campaign-tracker.s3.us-east-2.amazonaws.com/pcs/' + thumbnail" />
                                <img v-else src='../../assets/images/thumbnail-default.png'/>
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
    components: {
        CampaignHeader: () => import('@/components/campaign/campaign-list/CampaignHeader.vue'),
    },
    computed: {
        ...mapGetters([
            'getCampaigns',
        ]),
        loadCampaigns(){
            return this.$store.state.campaignThumbnails;
        },
        loadPcs(){
            return this.$store.state.pcs;
        },
        currentCampaignId(){
            return this.$store.state.campaign.id;
        }
    },
    watch: {
        loadPcs: function (newValue){
            if(newValue){
                this.$store.dispatch('campaignThumbnails')
                this.loadCampaigns = this.$store.state.campaignThumbnails;
            }
        }
    },
    mounted() {
        this.$store.dispatch('campaignThumbnails')
    },
    data(){
        return{
            collapsed: true
          
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
