<template>
    <div>
    <p>Add a new Player Character:</p>
    <form @submit.prevent="newPc" enctype="multipart/form-data">
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
</template>
<script>
import axios from 'axios';
    export default {
        name: "AddPc",
        data(){
            return{
                pcName: '',
                pcClass: '',
                pcRace: '',
                pcDescription: '',
                file: null
            }
        },
        methods: {

            selectFile(){
                this.file = this.$refs.file.files[0];
            },
            async newPc(){ 

                const formData = new FormData();
            
                formData.append("pcName", this.pcName);
                formData.append("pcClass", this.pcClass);
                formData.append("pcRace", this.pcRace);
                formData.append("pcDescription", this.pcDescription);
                
                if (this.file){
                    formData.append('file', this.file);
                    try{
                        await axios.post('/addPcWithImage', formData)  
                    }catch(err){
                        console.log(err);
                    }
                }
               else{
                   await axios.post('/addPc', formData)
               }
                
            }

        }
    }
</script>
