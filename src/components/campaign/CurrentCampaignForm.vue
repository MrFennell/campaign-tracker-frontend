<template>
<div v-if="loadCampaign" id="current-campaign-form" >
    <p v-if="updateMessage" class="update-message">{{updateMessage}}</p>
    <div>
        <p v-if="errors.length">
            <i><font-awesome-icon icon="exclamation-triangle" /></i><b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
        </p>
        <form @submit.prevent="updateCampaign">
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label for="title" class="label">Title:</label>
                </div>
                <div class="control">
                    <input type="input" name="title" class="input" placeholder="Campaign Title" v-model="loadCampaign.title">
                </div>
            </div>
            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label for="description" class="label">Description:</label>
                </div>
                <div class="control">
                    <input type="input" name="description" class="input" placeholder="Campaign Description" v-model="loadCampaign.description">
                </div>
            </div>
            
            <input type="submit" value="Update" class="button is-primary is-right">
        </form>
    </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: "CurrentCampaign",
    computed: {
    ...mapGetters([
        'getCampaignId',
        'getCampaignById'
    ]),
        loadCampaign(){
            const id = this.$store.getters.getCampaignId;
            return this.$store.getters.getCampaignById(id);
        },
    },
    data(){
        return{
            title: '',
            description: '',
            isEditing: false,
            updateMessage: '',
            errors: [],
            error: '',
        }
    },
    
    methods: {
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                this.isEditing = false;
            }
        },
        async updateCampaign(){
            await this.$store.dispatch('updateCampaign', this.loadCampaign)
            .then(
                 this.updateMessage = "Updated!",
                 (error) => this.error = error.response.data.error
            )
        },
    }
}
</script>
<style lang="scss">
#current-campaign-form{
    text-align: center;
    clear: both;
}
</style>