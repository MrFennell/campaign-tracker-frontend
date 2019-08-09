<template>
    <div class="container">
        <p v-if="successMessage">{{successMessage}}</p>    
        <div v-if="!showForm">
            <p><a @click.prevent="formToggle">Add a new PC</a></p>
        </div>

        <div v-if="showForm">
            <p ref="formTop">Add a new player character below.</p >

            <div class="is-pulled-right">
                <a class="delete" @click="showForm = false"></a>
            </div>
            <p v-if="errors.length">
                <b><i><font-awesome-icon icon="exclamation-triangle" /></i>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </p>
            <form @submit.prevent="newPc" enctype="multipart/form-data" >
                <div class="columns is-multiline">
                    <div class="column is-half">
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
                    </div>
                    <div class="column is-half">
                        <div class="field">
                            <label for="pcRace" class="label">Race:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcRace" placeholder="PC Race" v-model="pcRace">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcLevel" class="label">Level:</label>
                            <div class="control">
                                <input type="number" class="input" name="pcLevel" placeholder="Level" v-model="pcLevel">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcLifestate" class="label">Life State:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcLifestate" placeholder="Dead or alive?" v-model="pcLifestate">
                            </div>
                        </div>
                    </div>
                    <div class="column is-half">
                        <div class="field">
                            <label for="pcSharedBio" class="label" >Shared Biography:</label>
                            <textarea  class="textarea"  name="pcSharedBio" placeholder="All players and GMs will see this." v-model="pcSharedBio"></textarea>
                        </div>
                    </div>
                    <div class="column is-half">
                        <div class="field">
                            <label for="pcPrivateBio" class="label" >Private Biography:</label>
                            <textarea  class="textarea"  name="pcPrivateBio" placeholder="Biography that will only be shared between the GM and the player." v-model="pcPrivateBio"></textarea>
                        </div>
                    </div>
                    <div class="column is-full">
                        <div class="field">
                            <label for="pcDescription" class="label" >Description:</label>
                            <textarea  class="textarea"  name="pcDescription" placeholder="PC Description" v-model="pcDescription"></textarea>
                        </div>
                    </div>
                    <div class="column is-full is-pulled-right">
                        <div class="field">
                            <label for="image" class="image" >Image:</label>
                            <input type="file" class="file"  ref="file" @change="selectFile">
                        </div>
                        <input type="submit" class="button is-primary" value="Create">
                        <input type="submit" class="button" value="Hide" @click="showForm = false">
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
// import axios from 'axios';
    export default {
        name: "AddPc",
        data(){
            return{
                pcName: '',
                playerName: '',
                pcClass: '',
                pcRace: '',
                pcDescription: '',
                pcLevel: '',
                pcLifestate: '',
                pcSharedBio: '',
                pcPrivateBio: '',
                file: null,
                errors: [],
                error: '',
                showForm: false,
                successMessage: null
            }
        },
        methods: {
            formToggle(){
                if (this.showForm === true){
                    this.showForm = false;
                }else{
                    this.showForm = true;
                    // this.$nextTick(() => {
                    //     this.$refs.formTop.scrollIntoView({behavior: "smooth", block: "end"});
                    // });
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
                        formData.append("pcLevel", this.pcLevel);
                        formData.append("pcLifestate", this.pcLifestate);
                        formData.append("pcSharedBio", this.pcSharedBio);
                        formData.append("pcPrivateBio", this.pcPrivateBio);
                        formData.append("pcDescription", this.pcDescription);
                        
                        if (this.file){
                            formData.append('file', this.file);
                            try{
                                this.$store.dispatch('addPcWithImage', formData),
                                this.showForm = false;
                                this.successMessage =  "Character created!";
                                this.file = null;
                                setTimeout(() => this.successMessage = null, 3000);

                            }catch(err){
                                console.log(err);
                            }
                        }
                        else{
                            this.$store.dispatch('addPc', formData),
                            this.showForm = false;
                            this.successMessage =  "Character created!";
                            this.file = null;
                            setTimeout(() => this.successMessage = null, 3000);
                        }
                }
            }
        }
    }
</script>

// <style lang="scss">



// </style>