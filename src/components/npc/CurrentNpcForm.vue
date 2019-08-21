<template>
        <div v-if="loadNpc">
            <div class="info" v-if="!isEditing">
                <span class="update-message">{{updateMessage}}</span>
                <a class="edit-button" @click="edit">Edit</a>
                <p>Details:</p>
                <p v-if="loadNpc && loadNpc.name">Name: {{ loadNpc.name }}</p>
                <p v-else>error - enter Name</p>
                <p v-if="loadNpc && loadNpc.race">Class: {{ loadNpc.race }}</p>
                <p v-if="loadNpc && loadNpc.profession">Description: {{ loadNpc.profession }}</p>
                <p v-if="loadNpc && loadNpc.lifeState">Life State: {{ loadNpc.lifeState }}</p>
                <p v-if="loadNpc && loadNpc.description">Description: {{ loadNpc.description }}</p>
                <p v-if="loadNpc && loadNpc.sharedBio">Shared Bio: {{ loadNpc.sharedBio }}</p>
                <p v-if="loadNpc && loadNpc.privateBio">Private Bio: {{ loadNpc.privateBio }}</p>
                
            </div>
            <div v-if="isEditing">
                <a class="edit-button-close" @click="isEditing = false">Quit Editing</a>
                
                <p v-if="errors.length">
                    <i><font-awesome-icon icon="exclamation-triangle" /></i><b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </p>
                <form @submit.prevent="updateNpc" enctype="multipart/form-data">
                    <div class="field">
                        <label class="label" for="name">Name:</label>
                        <div class="control">
                            <input type="input" class="input" name="name" placeholder="NPC Name" v-model="loadNpc.name">
                        </div>
                    </div>
                    <div class="field">
                        <label for="race" class="label">Race:</label>
                        <div class="control">
                            <input type="input" class="input" name="race" placeholder="NPC Race" v-model="loadNpc.race">
                        </div>
                    </div>
                    <div class="field">
                        <label for="description" class="label" >Description:</label>
                        <textarea  class="textarea"  name="description" placeholder="Physical Description" v-model="loadNpc.description"></textarea>
                    </div>
                    <div class="field">
                        <label for="lifestate" class="label">Life State:</label>
                        <div class="control">
                            <input type="input" class="input" name="lifeState" placeholder="Dead or alive? Somewhere in between?" v-model="loadNpc.lifeState">
                        </div>
                    </div>
                    <div class="field">
                        <label for="sharedBio" class="label" >Shared Biography:</label>
                        <textarea  class="textarea"  name="sharedBio" placeholder="All players and GMs will see this." v-model="loadNpc.sharedBio"></textarea>
                    </div>
                    <div class="field">
                        <label for="privateBio" class="label" >Private Biography:</label>
                        <textarea  class="textarea"  name="privateBio" placeholder="Biography that will only be shared between the GM and the player." v-model="loadNpc.privateBio"></textarea>
                    </div>
                    <div class="field">
                        <label for="image" class="image" >Image:</label>
                        <input type="file" class="file"  ref="file" @change="selectFile">
                    </div>

                    <div class="field is-grouped">
                        <p class="control">
                            <input type="submit" class="button is-primary" value="Update">
                        </p>
                        <p class="control">
                            <!-- <input type="button" class="button" value="Discard Changes" @click="hideNpc"> -->
                        </p>
                        <p class="control">
                            <input type="button" class="button is-warning" value="Delete" @click="deleteNpc">
                        </p>
                    </div>
                </form>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "CurrentNpcForm",
    computed: {
        ...mapGetters([
            'getNpcById',
            'getNpcId'
        ]),

        loadNpc(){
            const id = this.$store.getters.getNpcId;
            return this.$store.getters.getNpcById(id);
        }
    },
    props: 
        ['scrollTarget']
    ,
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
            newImage: false,
            
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
        async updateNpc(){ 
            this.errors = [];
            if (!this.loadNpc.name){
                this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"}),
                this.errors.push('Name is required.');
            }else{
            const formData = new FormData();
                const npcId = this.loadNpc.id;
                const oldImage = this.loadNpc.imageSrc;
                formData.append('npcId', npcId);
                formData.append('oldImage', oldImage);
                formData.append("name", this.loadNpc.name);
                formData.append("race", this.loadNpc.race);
                formData.append("profession", this.loadNpc.profession);
                formData.append("description", this.loadNpc.description);
                formData.append("lifestate", this.loadNpc.lifestate);
                formData.append("sharedBio", this.loadNpc.sharedBio);
                formData.append("privateBio", this.loadNpc.privateBio);
                if (this.file){
                    formData.append('file', this.file);
                }
                try{
                    this.$store.dispatch('updateNpc', formData)
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
                    
            }
        },
        
        async deleteNpc(){ 

           if  (confirm('Delete PC?')) {
            this.$store.dispatch('deleteNpc', this.loadNpc)
                .then(
                    this.isEditing = false,
                    this.updateMessage = '',
                    this.$store.dispatch('setNpcNull', null),  
                    this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"}),
                    (error) => this.error = error.response.data.error
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