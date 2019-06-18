<template>

    <div class="content">   
        <p>Choose a campaign below to load your data.</p>
        <div v-for="campaign in loadCampaigns" v-bind:key="campaign.id">
            <div class="box" id="campaigns">  
                <h2 class="title" >{{ campaign.title }}</h2>
                <p class="campaign-description">{{ campaign.description }}</p>
                <div class="level">
                    <button class="button" @click="setCurrentCampaign(campaign)">Set to Current</button>
                    <!-- <p><a  @click="edit">Edit</a></p> -->
                </div>
            </div>
            </div>
    </div>
</template>

<script>
// import axios from 'axios';
export default {
    name: "ListCampaigns",
    computed: {
        loadCampaigns(){
            return this.$store.state.campaigns;
            // return this.$store.getters.hasPlayers;
        }
    },
    data(){
        return{
            collapsed: true,
            isEditing: true,
            title: '',
            description: ''
        }
    },
    methods: {
        async setCurrentCampaign(campaign){
            await this.$store.dispatch('setCurrentCampaign', campaign)
            .then(
                    () => this.$router.go(),

            )
            
        },
        async updateCampaign(campaign){
                await this.$store.dispatch('updateCampaign', campaign)
            // .then(
            //     () => this.$router.go(),
            // )
        },
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                this.isEditing = false;
            }
        }
    }
}

</script>
// <style lang="scss">
// #campaigns{
//     background-color: blue;
// }
// </style>
