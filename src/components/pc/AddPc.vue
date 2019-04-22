<template>
    <div>
        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
        </p>

        <div v-if="!formVisible">
            <div class="tag" @click="toggleForm">
                <p class="add-new-box">Add a new PC</p>
            </div>
        </div>
        <div v-if="formVisible" class="hiddenForm">
            <p>Add a new Player Character:</p>
            <form @submit.prevent="newPc" enctype="multipart/form-data">
                <div class="field">
                    <label class="label" for="pcName">Name:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcName" placeholder="PC Name" v-model="pcName">
                    </div>
                </div>

                <div class="field">
                    <label for="playerName" class="label" >Player Name:</label>
                    <div class="control">
                        <input type="input" class="input" name="playerName" placeholder="Player Name" v-model="playerName">
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
                <button class="button" @click="toggleForm">Hide</button>
            </form>
            
        </div>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        name: "AddPc",
        // props:['showForm'],
        data(){
            return{
                pcName: '',
                playerName: '',
                pcClass: '',
                pcRace: '',
                pcDescription: '',
                file: null,
                formVisible: this.showForm,
                errors: [],
                error: ''
            }
        },
        computed: {
            showForm(){
                return this.formVisible;
            }
        },
        methods: {

            // checkStore(){
            //     let currentCampaign = this.$store.state.currentCampaign
            //     console.log(currentCampaign);
            // },
            toggleForm(){
                if (!this.formVisible){
                    this.formVisible = true;
                }
                else{
                    this.formVisible = false;
                }
            },
            
            selectFile(){
                this.file = this.$refs.file.files[0];
            },
            async newPc(){ 
                
                    if (!this.pcName){
                        this.errors.push('Please enter a name.');
                    }
                    else if (!this.playerName){
                        this.errors.push('Please enter the name of the player.');
                    }
                    else{

                        this.errors = [];                    
                        const formData = new FormData();
                        formData.append("pcName", this.pcName);
                        formData.append("playerName", this.playerName);
                        formData.append("pcClass", this.pcClass);
                        formData.append("pcRace", this.pcRace);
                        formData.append("pcDescription", this.pcDescription);
                        
                        if (this.file){
                            formData.append('file', this.file);
                            try{
                                await axios.post('/pcs/addPcWithImage', formData)
                                .then(() => this.$router.push('/'))
                            }catch(err){
                                console.log(err);
                            }
                            // this.$router.push('/pcs')
                        }
                        else{
                            await axios.post('/pcs/addPc', formData)
                        }
                }
            }

        }
    }
</script>

// <style lang="scss">



// </style>