<template>
    <div class="content">
        <div class="columns is-multiline">
            <div class="column is-half">
                <p v-if="campaign.title">Campaign: {{ campaign.title }}</p>
                <p v-else>Untitled</p>
                <p v-if="campaign.description">Description: {{campaign.description}}</p>
                <p v-else>(no details)</p>
                <button @click="setCurrentCampaign">Set Current Campaign</button>
            </div>
        </div>
        <form class="box" @submit.prevent="updateCampaign(campaign)" v-if="isEditing">
            <p>Edit:</p>
            <p>{{updateMessage}}</p>
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
            <input type="button" class="button is-warning" value="Delete" @click="deleteCampaign">
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'campaign',
    data() {
        return {
            campaign: {},
            collapsed: true,
            isEditing: true,
            updateMessage: ''
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
        },
        async updateCampaign(campaign){
            await this.$store.dispatch('updateCampaign', campaign)
            .then(
                // () => this.$router.go(),
                 () => this.$router.push(`/campaigns/${this.$route.params.id}`),
                 this.updateMessage = "Updated!",
                 (error) => this.error = error.response.data.error
            )
        },
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                this.isEditing = false;
            }
        },
        async deleteCampaign(){ 

           if  (confirm('Delete campaign?')) {
            this.$store.dispatch('deleteCampaign', this.campaign)
                .then(
                    () => this.$router.push('/'),
                    (error) => this.error = error.response.data.error
                )
           }
           else{
            this.updateMessage = "Delete cancelled."
           }
        }
    }
}
</script>

<style>


</style>
