<template>
    <div>
    <form @submit.prevent="AddCampaign" >
        <label for="title">Title:</label>
        <input type="input" name="title" placeholder="Campaign Title" v-model="title">
        <label for="description">Description:</label>
        <input type="input" name="description" placeholder="Campaign Description" v-model="description">
        <input type="submit" value="Create">
    </form>

    </div>
</template>
<script>
import axios from 'axios';
import store from '../store';
import { mapGetters } from 'vuex';

    export default {
        name: "AddCampaign",
        computed: mapGetters(['getUserId']),
        data(){
            return{
                title: '',
                description: ''
            }
        },
        methods: {
            AddCampaign(){

            this.$store.dispatch('AddCampaign', {
                title:this.title,
                description:this.description,
                createdBy:this.$store.getters.getUserId
            })
                .then(() => this.$router.push('/Home'))

                .catch(error => this.error = error.response.data.message);
            }

        }
    }
</script>
