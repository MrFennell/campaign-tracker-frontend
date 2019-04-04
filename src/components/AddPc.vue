<template>
    <div>
    <form @submit.prevent="AddPc" >
        <label for="pcName">Name:</label>
        <input type="input" name="pcName" placeholder="PC Name" v-model="pcName">
        <label for="pcClass">Class:</label>
        <input type="input" name="pcClass" placeholder="PC Class" v-model="pcClass">
        <label for="pcRace">Race:</label>
        <input type="input" name="pcRace" placeholder="PC Race" v-model="pcRace">
        <label for="pcDescription">Description:</label>
        <input type="input" name="pcDescription" placeholder="PC Description" v-model="pcDescription">
        <input type="submit" value="Create">
    </form>

    </div>
</template>
<script>
import axios from 'axios';
import store from '../store';
    export default {
        name: "AddPc",
        data(){
            return{
                pcName: '',
                pcClass: '',
                pcRace: '',
                pcDescription: ''
            }
        },
        methods: {
            AddPc(){
            this.$store.dispatch('AddPc', {
                pcName:this.pcName,
                pcClass:this.pcClass,
                pcRace:this.pcRace,
                pcDescription:this.pcDescription
            })
                .then(() => this.$router.push('/Home'))
                .catch(error => this.error = error.response.data.message);
            }

        }
    }
</script>
