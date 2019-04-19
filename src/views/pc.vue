<template>
    <div class="content">
        
        <h2>{{pc.pcName }}</h2>
        
        <div class="columns is-multiline">
            <!-- <div v-if="!isEditing" class="column is-one-fifth"> -->
            <div class="column is-half">
                <p v-if="pc.playerName">Played by: {{ pc.playerName }}</p>
                <p v-else>Please enter name of player!</p>
                <p v-if="pc.pcClass">Class: {{ pc.pcClass }}</p>
                <p v-else>Class Unknown</p>
                <p v-if="pc.pcRace">Race: {{pc.pcRace}}</p>
                <p v-else>Race Unknown</p>
                <p v-if="pc.pcDescription">Description: {{ pc.pcDescription }}</p>
                <p v-else>No description.</p>
                <div>
                    <figure class="image is-4by3">
                        <img :src="pc.imageSrc" />
                    </figure>
                </div>
                <div class="field">
                    <label for="image" class="image" >Image:</label>
                    <input type="file" class="file"  ref="file" @change="selectFile">
                    <button class="button" @click="updatePcImage">Update</button>
                </div>
            </div>

            <!-- <div v-if="isEditing" class="column is-one-fifth"> -->
            <div class="column is-half">    

                <form @submit.prevent="updatePc" enctype="multipart/form-data">
                <p>{{updateMessage}}</p>
                <div class="field">
                    <label class="label" for="pcName" >Name:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcName" :placeholder="pc.pcName" v-model="pc.pcName">
                    </div>
                </div>
                <div class="field">
                    <label class="label" for="playerName">Played by:</label>
                    <div class="control">
                        <input type="input" class="input" name="playerName" :placeholder="pc.playerName" v-model="pc.playerName">
                    </div>
                </div>
                <div class="field">
                    <label for="pcClass" class="label" >Class:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcClass" :placeholder="pc.pcClass" v-model="pc.pcClass">
                    </div>
                </div>
                <div class="field">
                    <label for="pcRace" class="label">Race:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcRace" :placeholder="pc.pcRace" v-model="pc.pcRace">
                    </div>
                </div>
                <div class="field">
                    <label for="pcDescription" class="label" >Description:</label>
                    <input type="input" class="input"  name="pcDescription" :placeholder="pc.pcDescription" v-model="pc.pcDescription">
                </div>

                <input type="submit" class="button is-primary" value="Update">
                <input type="button" class="button is-warning" value="Delete" @click="deletePc">
                <div class="field">
                
                </div>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'pc',
    data() {
        return {
            pc: {},  
            file: "",
            isEditing: false,
            pcName: '',
            playerName: '',
            pcClass: '',
            pcRace: '',
            pcDescription: '',
            imageSrc: '',
            deleteAlert: false,
            updateMessage: null
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
        },
        async updatePc(){ 
            this.$store.dispatch('updatePc', this.pc)
                .then(
                    
                    () => this.$router.push(`/pcs/${this.$route.params.id}`),
                    this.updateMessage = "Success!",
                    (error) => this.error = error.response.data.error
                )

        },
        async deletePc(){ 

           if  (confirm('Delete PC?')) {
            this.$store.dispatch('deletePc', this.pc)
                .then(
                    () => this.$router.push('/pcs'),
                    (error) => this.error = error.response.data.error

                )

           }
           else{
            this.updateMessage = "Delete cancelled."
           }


        },
        async updatePcImage (){
            const formData = new FormData();
            formData.append('PcId', this.pc.id);
            formData.append('file', this.file);
            try{
                await axios.post('/pcs/updatePcImage', formData)
                .then(this.updateMessage = "Image updated.")
                .then(() => this.$router.push(`/pcs/${this.$route.params.id}`))
            }catch(err){
                console.log(err);
            }
        }

    }
    // ,
    // beforeRouteLeave(to, from, next){
    //     if (!this.pc || confirm('you made changes that will not be saved, leave page?')){
    //         next();
    //     }
    // }
}
</script>

<style lang="scss" scoped>
    .pc-image{
        max-width:400px;
    }

</style>
