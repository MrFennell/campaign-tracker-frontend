<template>
    <div class="content">   
            <p>Choose a campaign below to load your data!</p>
            <div v-for="campaign in loadCampaigns" v-bind:key="campaign.id">
            <div class="box" id="campaigns">  
                <router-link class="title" :to="{ name: 'campaign', params: { id: campaign.id }}">{{ campaign.title }}</router-link>
                <p>{{ campaign.description }}</p>
                <div class="level">
                    <button class="button" @click="setCurrentCampaign(campaign)">Set to Current</button>
                    <router-link :to="{ name: 'campaign', params: { id: campaign.id }}">Edit</router-link>
                </div>
                
                </div>
            </div>
            
            <form @submit.prevent="updateCampaign" v-if="isEditing">
                <div class="field">
                    <label for="title" class="label">Title:</label>
                    <div class="control">
                        <input type="input" name="title" class="input" placeholder="Campaign Title" v-model="title">
                    </div>
                </div>
                <div class="field">
                    <label for="description" class="label">Description:</label>
                    <div class="control">
                        <input type="input" name="description" class="input" placeholder="Campaign Description" v-model="description">
                    </div>
                </div>
                
                <input type="submit" value="Create" class="button is-primary">
            </form>


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
            isEditing: false,
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
