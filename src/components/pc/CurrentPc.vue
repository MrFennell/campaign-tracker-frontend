<template>
        <div v-if="loadPc" class="box">
            <div class="is-pulled-right">
                <a class="delete" @click="hidePc()"></a>
            </div>
            <div class="columns">
                
                    <div class="column is-one-third">
                        <h2 v-if="loadPc && loadPc.pcName">{{ loadPc.pcName }}</h2>
                        <h2 v-else><i><font-awesome-icon icon="exclamation-triangle" /></i>error</h2>

                        <div id="image-container">

                            <div v-if="loadPc  && loadPc.imageSrc">
                                <div v-if="loadPc.imageSrc" id="currentImage" class="image is-square">
                                    <img :src="loadPc.imageSrc" />
                                </div>

                                <figure v-if="newImage" id="currentImage" class="image is-4by3">
                                    <img v-if="url" :src="url" />
                                </figure>
                            </div>

                            <a v-if="!showChangeImageButton" @click="showChangeImageButton = true">Change image</a>
                            
                            <div v-if="showChangeImageButton" class="field">
                                <label for="image" class="image" >Image:</label>
                                <input type="file" class="file" ref="file" @change="selectFile">
                                <button class="button" @click="updatePcImage">Update</button>.
                                <button class="button is-light" @click="showChangeImageButton = false">Cancel</button>
                            </div>
                        </div>

                    </div>

                <div class="column is-one-third">
                    <p>Details:</p>

                    <p v-if="loadPc && loadPc.pcName">Name: {{ loadPc.pcName }}</p>
                    <p v-else>error - enter Name</p>

                    <p v-if="loadPc && loadPc.playerName">Played by: {{ loadPc.playerName }}</p>
                    <p v-else>Please enter name of player!</p>
                    <p v-if="loadPc && loadPc.pcClass">Class: {{ loadPc.pcClass }}</p>
                    <p v-if="loadPc && loadPc.pcRace">Race: {{loadPc.pcRace}}</p>
                    <p v-if="loadPc && loadPc.pcDescription">Description: {{ loadPc.pcDescription }}</p>
                    <p v-if="loadPc && loadPc.pcLevel">Level: {{ loadPc.pcLevel }}</p>
                    <p v-if="loadPc && loadPc.pcLifestate">Life State: {{ loadPc.pcLifestate }}</p>
                    <p v-if="loadPc && loadPc.pcSharedBio">Shared Bio: {{ loadPc.pcSharedBio }}</p>
                    <p v-if="loadPc && loadPc.pcPrivateBio">Private Bio: {{ loadPc.pcPrivateBio }}</p>

                    <p v-else>No description.</p>

                </div>
                <div  class="column is-one-third">
                   <p> {{updateMessage}}   </p>
                <a v-if="!isEditing" @click="edit">Edit</a>
                <div v-if="isEditing">
                    <a @click="isEditing = false">Quit Editing</a>
                     
                    <p v-if="errors.length">
                        <i><font-awesome-icon icon="exclamation-triangle" /></i><b>Please correct the following error(s):</b>
                        <ul>
                            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                        </ul>
                    </p>
                    <form @submit.prevent="updatePc" enctype="multipart/form-data">
                        <div class="field">
                            <label class="label" for="pcName">Name:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcName" placeholder="PC Name" v-model="loadPc.pcName">
                            </div>
                        </div>
                        <div class="field">
                            <label for="playerName" class="label" >Player Name:</label>
                            <div class="control">
                                <input type="input" class="input" name="playerName" placeholder="Player Name" v-model="loadPc.playerName">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcClass" class="label" >Class:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcClass" placeholder="PC Class" v-model="loadPc.pcClass">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcRace" class="label">Race:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcRace" placeholder="PC Race" v-model="loadPc.pcRace">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcLevel" class="label">Level:</label>
                            <div class="control">
                                <input type="number" class="input" name="pcLevel" placeholder="Level" v-model="loadPc.pcLevel">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcLifestate" class="label">Life State:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcLifestate" placeholder="Dead or alive?" v-model="loadPc.pcLifestate">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcDescription" class="label" >Description:</label>
                            <textarea  class="textarea"  name="pcDescription" placeholder="PC Description" v-model="loadPc.pcDescription"></textarea>
                        </div>
                        <div class="field">
                            <label for="pcSharedBio" class="label" >Shared Biography:</label>
                            <textarea  class="textarea"  name="pcSharedBio" placeholder="All players and GMs will see this." v-model="loadPc.pcSharedBio"></textarea>
                        </div>
                        <div class="field">
                            <label for="pcPrivateBio" class="label" >Private Biography:</label>
                            <textarea  class="textarea"  name="pcPrivateBio" placeholder="Biography that will only be shared between the GM and the player." v-model="loadPc.pcPrivateBio"></textarea>
                        </div>

                        <!-- <div class="field">
                            <label for="image" class="image" >Image:</label>
                            <input type="file" class="file"  ref="file" @change="selectFile">
                        </div> -->
                        <div class="field is-grouped">
                            <p class="control">
                                <input type="submit" class="button is-primary" value="Update">
                            </p>
                            <p class="control">
                                <input type="button" class="button" value="Discard Changes" @click="hidePc">
                            </p>
                            <p class="control">
                                <input type="button" class="button is-warning" value="Delete" @click="deletePc">
                            </p>

                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
// import axios from 'axios';
export default {
    name: "CurrentPc",
    computed: {
        loadPc(){
            return this.$store.state.pc;
        }
    },
    data() {
        return {
            file: null,
            isEditing: false,
            deleteAlert: false,
            updateMessage: '',
            errors: [],
            error: '',
            defaultThumbnail: "src='./assets/logo.png'",
            showChangeImageButton: false,
            newImage: false
        }
    },
    methods:{
        selectFile(){
            this.file = this.$refs.file.files[0];
            this.newImage = true;
            const file = this.$refs.file.files[0];
            this.url = URL.createObjectURL(file);
        },
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                this.isEditing = false;
            }
        },
        async hidePc(){
            if (this.isEditing){
               if (confirm("Discard changes to Player Character?")){
                   this.isEditing = false,
                   this.updateMessage = '',
                   this.$store.dispatch('setPcNull', null);     
               }
            }
            else{
                this.updateMessage = '',
                this.$store.dispatch('setPcNull', null);     
            }
            
        },
        async updatePc(){ 
            if (!this.loadPc.pcName){
                this.errors.push('Name is required.');
            }else{
               if (this.newImage === true){
                    const formData = new FormData();

                    if (this.file){
                        const pcId = this.loadPc.id;
                        const oldImage = this.loadPc.imageSrc;

                        formData.append('PcId', pcId);
                        formData.append('oldImage', oldImage);
                        formData.append('file', this.file);
                        formData.append("pcName", this.loadPc.pcName);
                        formData.append("playerName", this.loadPc.playerName);
                        formData.append("pcClass", this.loadPc.pcClass);
                        formData.append("pcRace", this.loadPc.pcRace);
                        formData.append("pcLevel", this.loadPc.pcLevel);
                        formData.append("pcLifestate", this.loadPc.pcLifestate);
                        formData.append("pcSharedBio", this.loadPc.pcSharedBio);
                        formData.append("pcPrivateBio", this.loadPc.pcPrivateBio);
                        formData.append("pcDescription", this.loadPc.pcDescription);
                        try{
                            this.$store.dispatch('updatePcWithImage', formData)
                            .then(
                                this.isEditing = false,
                                this.updateMessage = '',
                                this.newImage = false,
                                (error) => this.error = error.response.data.error

                            )
                        }catch(err){
                            this.updateMessage = "Error updating Image."
                            console.log(err);
                        }
                    }else{
                        this.updateMessage = "No change to image."
                    }
               }
               else{
                    this.$store.dispatch('updatePc', this.loadPc)
                    .then(
                        this.isEditing = false,
                        this.updateMessage = "Updated.",
                        setTimeout(() => this.updateMessage = null, 3000),
                        (error) => this.error = error.response.data.error
                    )
               }
            }
        },
        async deletePc(){ 

           if  (confirm('Delete PC?')) {
            this.$store.dispatch('deletePc', this.loadPc)
                .then(
                    this.isEditing = false,
                    this.updateMessage = '',
                    this.$store.dispatch('setPcNull', null),  
                    (error) => this.error = error.response.data.error
                )
           }
           else{
            this.updateMessage = "Delete cancelled."
            setTimeout(() => this.updateMessage = null, 3000);

           }
        },
        async updatePcImage (){
            const formData = new FormData();

            if (this.file){
                const pcId = this.loadPc.id;
                const oldImage = this.loadPc.imageSrc;

                formData.append('PcId', pcId);
                formData.append('oldImage', oldImage);
                formData.append('file', this.file);
                try{
                    this.$store.dispatch('updatePcImage', formData)
                        .then(
                            this.isEditing = false,
                            this.updateMessage = '',
                            this.newImage = false,
                            (error) => this.error = error.response.data.error
                        )
                }catch(err){
                    this.updateMessage = "Error updating Image."
                    console.log(err);
                }
            }else{
                this.updateMessage = "No change to image."
            }
        }
    }
}

</script>

<style lang="scss">

// #currentImage{
//     max-width:200px;
// }

</style>