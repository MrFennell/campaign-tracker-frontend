<template>
    <div class="content">
        <div>
            <h1>{{pc.pcName }}</h1>
            <p v-if="pc.pcClass">Class: {{ pc.pcClass }}</p>
            <p v-else>Class Unknown</p>
            <p v-if="pc.pcRace">Race: {{pc.pcRace}}</p>
            <p v-else>Race Unknown</p>
            <p v-if="pc.pcDescription">Description: {{ pc.pcDescription }}</p>
            <p v-else>No description.</p>
        </div>
        <!-- <form @submit.prevent="AddImage" enctype="multipart/form-data">
            <div class="field">
                <label for="image" class="image" >Image:</label>
                <input type="file" class="file" ref="file" @change="selectFile">
            </div>
            <input type="submit" class="button is-primary" value="Create">

        </form> -->
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'pc',
    props: ['id'],
    data() {
        return {
            pc: {},  
            file: ""
            
        };
    },

    async mounted() {
        const response = await axios.get(`/pcs/${this.$route.params.id}`);
        this.pc = response.data;
    },
    
    // methods:{
    //     selectFile(){
    //     this.file = this.$refs.file.files[0];
    //     },
    //     async AddImage(){
    //         const formData = new FormData();
                
    //         if (file){
    //         formData.append('file', this.file);
    //             try{
    //                 await axios.post('/uploadPcPhoto', formData)  
    //             }catch(err){
    //                 console.log(err);
    //             }
    //         }
    //     }
    // }
}
</script>

<style>


</style>
