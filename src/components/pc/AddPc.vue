<template>
    <div class="container">
        <div class="add-form-container">
            <div ref="formTop" class="add-form-header">
                <p>Add a new player character below.</p>
                <a class="delete" @click="$emit('hideForm')"></a>
            </div>
            
            <div v-if="errors.length" class="error-text">
                <div>
                    <b><i><font-awesome-icon icon="exclamation-triangle" /></i></b>
                </div>
                <div>
                    <b v-if="errors.length > 1"><p>Please correct the following errors:</p></b>
                    <b v-else><p>Please correct the following error:</p></b>
                    <ul >
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </div>
            </div>
            <form @submit.prevent="newPc" enctype="multipart/form-data" >
                <div class="columns is-multiline">
                    <div class="column is-half">
                        <div class="field">
                            <label class="label" for="name">Name:</label>
                            <div class="control">
                                <input type="input" class="input" name="name" placeholder="PC Name" v-model="name">
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
                        <input type="submit" class="button" value="Hide" @click="$emit('hideForm')">
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
    props: 
        ['showForm','successMessage','scrollTarget']
    ,
    data(){
        return{
            name: '',
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
        }
    },
    methods: {
        selectFile(){
            this.file = this.$refs.file.files[0];
        },
        errorScroll(){
            this.$nextTick(() => {
                this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"});
            });
        },
        async newPc(){
            this.errors = [];
            if (!this.name && !this.playerName){
                this.errors.push('Please enter a name.');
                this.errors.push('Please enter the name of the player.');
                this.errorScroll();
            }
            else if (!this.name){
                this.errors.push('Please enter a name.');
                this.errorScroll();
            }
            else if (!this.playerName){
                this.errors.push('Please enter the name of the player.');
                this.errorScroll();
            }
            else{
                this.errors = [];                    
                const formData = new FormData();
                formData.append("name", this.name);
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
                }
                try{
                    this.$store.dispatch('addPc', formData),
                    this.file = null;
                    this.$emit('update:successMessage', "Character created!");
                    this.$emit('hideForm');
                }catch(err){
                    console.log(err);
                }
            }
        }
    }
}
</script>

// <style lang="scss">



// </style>