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
                        <!-- <p><a  @click="edit">Edit</a></p> -->
                    </div>
                </div>
                <!-- <form class="box" @submit.prevent="updateCampaign(campaign)" v-if="isEditing">
                    <p>Edit:</p>
                    <div class="field">
                        <label for="title" class="label">Title:</label>
                        <div class="control">
                            <input type="input" name="title" class="input" placeholder="Campaign Title" v-model="campaign.title">
                        </div>
                    </div>
                    <div class="field">
                        <label for="description" class="label">Description:</label>
                        <div class="control">
                            <input type="input" name="description" class="input" placeholder="Campaign Description" v-model="campaign.description">
                        </div>
                    </div>
                    
                    <input type="submit" value="Update" class="button is-primary">
                </form> -->
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
