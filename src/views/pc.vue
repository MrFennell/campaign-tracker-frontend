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
        <button @click="edit">Edit</button>
        <!-- <form @submit.prevent="AddImage" enctype="multipart/form-data">
            <div class="field">
                <label for="image" class="image" >Image:</label>
                <input type="file" class="file" ref="file" @change="selectFile">
            </div>
            <input type="submit" class="button is-primary" value="Create">

        </form> -->
            <div v-if="isEditing">
                <form @submit.prevent="sendFile" enctype="multipart/form-data">
                <div class="field">
                    <label class="label" for="pcName">Name:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcName" placeholder="PC Name" v-model="pcName">
                    </div>
                </div>
                <div class="field">
                    <label for="pcClass" class="label" >Class:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcClass" placeholder="PC Class" v-model="pcClass">
                    </div>
                </div>

                <div class="field">
                    <label for="pcRace" class="label">Race:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcRace" placeholder="PC Race" v-model="pcRace">
                    </div>
                </div>
                <div class="field">
                    <label for="pcDescription" class="label" >Description:</label>
                    <input type="input" class="input"  name="pcDescription" placeholder="PC Description" v-model="pcDescription">
                </div>
                <div class="field">
                    <label for="image" class="image" >Image:</label>
                    <input type="file" class="file"  ref="file" @change="selectFile">
                </div>
                <input type="submit" class="button is-primary" value="Create">
            </form>
        </div>

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
            file: "",
            isEditing: false,
            pcName: '',
            pcClass: '',
            pcRace: '',
            pcDescription: '',
        };
    },

    async mounted() {
        const response = await axios.get(`/pcs/${this.$route.params.id}`);
        this.pc = response.data;
    },
    
    methods:{
        selectFile(){
        this.file = this.$refs.file.files[0];
        },
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                this.isEditing = false;
            }
        }

        // async AddImage(){
        //     const formData = new FormData();
                
        //     if (file){
        //     formData.append('file', this.file);
        //         try{
        //             await axios.post('/uploadPcPhoto', formData)  
        //         }catch(err){
        //             console.log(err);
        //         }
        //     }
        // }
    }
}
</script>

<style>


</style>
