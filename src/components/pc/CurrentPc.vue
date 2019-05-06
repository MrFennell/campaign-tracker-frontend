<template>
        <div v-if="loadPc" class="content" >
            
            <div v-if="!pcVisible"> 
                    <p class="tag" value="Hide PC" @click="hidePc"><a>Show PC</a></p>

            </div>
            <div v-if="pcVisible"> 
                <!-- <p class="tag" value="Hide PC" @click="hidePc">Hide PC</p> -->


                <div class="columns">

                    <div class="column is-one-third">
                        <h2 v-if="loadPc && loadPc.pcName">{{ loadPc.pcName }}</h2>
                        <h2 v-else>error</h2>
                        <div v-if="loadPc  && loadPc.imageSrc">
                        
                        <!-- <figure id="currentImage" class="image is-4by3">
                            <img :src="defaultThumbnail" />
                        </figure> -->
                        <figure v-if="loadPc.imageSrc" id="currentImage" class="image is-4by3">
                            <img :src="loadPc.imageSrc" />
                        </figure>
                        </div>

                        <div class="field">
                            <label for="image" class="image" >Image:</label>
                            <input type="file" class="file"  ref="file" @change="selectFile">
                            <button class="button" @click="updatePcImage">Update</button>
                        </div>   

                    </div>
                    
                    <div class="column is-one-third">
                        <p>Details:</p>

                        <p v-if="loadPc && loadPc.pcName">Name: {{ loadPc.pcName }}</p>
                        <p v-else>error</p>
                        <p v-if="loadPc && loadPc.playerName">Played by: {{ loadPc.playerName }}</p>
                        <p v-else>Please enter name of player!</p>
                        <p v-if="loadPc && loadPc.pcClass">Class: {{ loadPc.pcClass }}</p>
                        <p v-else>Class Unknown</p>
                        <p v-if="loadPc && loadPc.pcRace">Race: {{loadPc.pcRace}}</p>
                        <p v-else>Race Unknown</p>
                        <p v-if="loadPc && loadPc.pcDescription">Description: {{ loadPc.pcDescription }}</p>
                        <p v-else>No description.</p>

                    </div>

                    <div class="column is-one-third">    
                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                            </ul>
                        </p>
                        <form @submit.prevent="updatePc" enctype="multipart/form-data">
                        
                        <div class="field">
                            <label class="label" for="pcName" >Name:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcName" :placeholder="loadPc.pcName" v-model="loadPc.pcName">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label" for="playerName">Played by:</label>
                            <div class="control">
                                <input type="input" class="input" name="playerName" :placeholder="loadPc.playerName" v-model="loadPc.playerName">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcClass" class="label" >Class:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcClass" :placeholder="loadPc.pcClass" v-model="loadPc.pcClass">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcRace" class="label">Race:</label>
                            <div class="control">
                                <input type="input" class="input" name="pcRace" :placeholder="loadPc.pcRace" v-model="loadPc.pcRace">
                            </div>
                        </div>
                        <div class="field">
                            <label for="pcDescription" class="label" >Description:</label>
                            <input type="input" class="input"  name="pcDescription" :placeholder="loadPc.pcDescription" v-model="loadPc.pcDescription">
                        </div>

                        <input type="submit" class="button is-primary" value="Update">
                        <input type="button" class="button is-warning" value="Delete" @click="deletePc">
                        <input type="button" class="button" value="Hide PC" @click="hidePc">

                        </form>
                    </div>

                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "CurrentPc",
    computed: {
        loadPc(){
            return this.$store.state.pc;
        }
    },
    data() {
        return {
            pc: {},
            pcName: '',
            file: "",
            isEditing: false,
            playerName: '',
            pcRace: '',
            pcClass: '',
            pcDescription: '',
            imageSrc: '',
            deleteAlert: false,
            pcVisible: true,
            errors: [],
            error: '',
            defaultThumbnail: "src='./assets/logo.png'"
        }
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
        },
        hidePc(){
            if (!this.pcVisible){
                this.pcVisible = true;
            }
            else{
                this.pcVisible = false;
            }
        },
        async updatePc(){ 

            if (!this.loadPc.pcName){
                this.errors.push('Name is required.');
                
            }else{
                this.$store.dispatch('updatePc', this.loadPc)
                    .then(
                        () => this.$router.push('/'),
                        this.updateMessage = "Success!",
                        (error) => this.error = error.response.data.error
                    )
            }

        },
        async deletePc(){ 

           if  (confirm('Delete PC?')) {
            this.$store.dispatch('deletePc', this.loadPc)
                .then(
                    // () => this.$router.push('/'),
                    () => this.$router.go(),
                    (error) => this.error = error.response.data.error

                )
           }
           else{
            this.updateMessage = "Delete cancelled."
           }
        },
        async updatePcImage (){
            console.log("hey"+this.loadPc.id);
            const formData = new FormData();
            formData.append('PcId', this.loadPc.id);
            formData.append('file', this.file);
            try{
                await axios.post('/pcs/updatePcImage', formData)
                // .then(this.updateMessage = "Image updated.")
                // .then(() => this.$router.push(`/pcs/${this.$route.params.id}`))
                .then(() => this.$router.push('/'))

            }catch(err){
                console.log(err);
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