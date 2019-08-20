<template>
    <div class="container-content">
    <p>Start a new Campaign</p>
    
    <form @submit.prevent="AddCampaign">
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
        name: "AddCampaign",
        data(){
            return{
                title: '',
                description: '',
            }
        },
        methods: {
            AddCampaign(){
                this.$store.dispatch('AddCampaign', {
                    user: this.$store.state.user,
                    title:this.title,
                    description:this.description,
                    createdBy:this.$store.getters.getUserId
                })
                    .then(() => this.$router.push('/'))
                    .catch(error => this.error = error.response.data.message);
                }

        }
    }
</script>
