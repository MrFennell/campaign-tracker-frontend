<template>
        <div v-if="loadPc">
            <div class="info" v-if="!isEditing">
                <span class="updateMessage">{{updateMessage}}</span>
                <a class="edit-button" @click="edit">Edit</a>
                <p>Details:</p>
                <p v-if="loadPc && loadPc.pcName">Name: {{ loadPc.pcName }}</p>
                <p v-else>No Name</p>
                <p v-if="loadPc && loadPc.playerName">Played by: {{ loadPc.playerName }}</p>
                <p v-else>Please enter name of player!</p>
                <p v-if="loadPc && loadPc.pcClass">Class: {{ loadPc.pcClass }}</p>
                <p v-if="loadPc && loadPc.pcRace">Race: {{loadPc.pcRace}}</p>
                <p v-if="loadPc && loadPc.pcDescription">Description: {{ loadPc.pcDescription }}</p>
                <p v-if="loadPc && loadPc.pcLevel">Level: {{ loadPc.pcLevel }}</p>
                <p v-if="loadPc && loadPc.pcLifestate">Life State: {{ loadPc.pcLifestate }}</p>
                <p v-if="loadPc && loadPc.pcSharedBio">Shared Bio: {{ loadPc.pcSharedBio }}</p>
                <p v-if="loadPc && loadPc.pcPrivateBio">Private Bio: {{ loadPc.pcPrivateBio }}</p>
            </div>
            
            <div v-if="isEditing">
                <div><a class="edit-button-close" @click="edit">Quit Editing</a></div>
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
                            <input type="input" class="input" name="pcName"  placeholder="PC Name" v-model="loadPc.pcName">
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "CurrentPcForm",
    props: 
        ['scrollTarget']
    ,
    computed: {
        ...mapGetters([
            'getPcById',
            'getPcId'
        ]),
        loadPc(){
            const id = this.$store.getters.getPcId;
            return this.$store.getters.getPcById(id);
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
            newImage: false,
            formChange: '',
        }
    },
    methods:{
        selectFile(){
            this.file = this.$refs.file.files[0];
            this.newImage = true;
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
                   this.errors = [];
                   this.$store.dispatch('setPcNull', null);  
               }
            }
            else{
                this.updateMessage = '',
                this.$store.dispatch('setPcNull', null);     
            }
        },
        async updatePc(){ 
            this.errors = [];
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
                                this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"}),
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
                        this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"}),
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
                    this.errors = [],
                    this.updateMessage = '',
                    this.$store.dispatch('setPcNull', null),  
                    this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"}),
                    (error) => this.error = error.response.data.error,
                    
                )
           }
           else{
            this.updateMessage = "Delete cancelled."
            setTimeout(() => this.updateMessage = null, 3000);

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