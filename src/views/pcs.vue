<template>
    <div class="content">
        <h2>Player Characters</h2>
        <div class="tile is-ancestor">
                    <div v-for="pc in pcs" v-bind:key="pc.id">
                    <div class="column">
                        <div class="half">
                            <div class="card-image">
                                    <figure class="image is-4by3">
                                    <img :src="pc.imageSrc" />
                                    </figure>
                            </div>
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">
                                            <p><router-link class="title" :to="{ name: 'pc', params: { id: pc.id }}">{{ pc.pcName }}</router-link></p>
                                            <p class="subtitle">Played by: {{ pc.playerName }}</p>
                                    </div>
                                </div>



                                    <div v-if="!isEditing">
                                        <p>Class: {{ pc.pcClass }}</p>
                                        <p>Race: {{ pc.pcRace }}</p>
                                        <p>Description: {{ pc.pcDescription }}</p>
                                        <button @click="edit" class="button">Edit {{pc.pcName}}</button>
                                    </div>
                                    
                                    <div v-if="isEditing">
                                        
                                        <form @submit.prevent="edit" enctype="multipart/form-data">
                                        <div class="field">
                                            <label class="label" for="pcName">Name:</label>
                                            <div class="control">
                                                <input type="input" class="input" name="pcName" placeholder="PC Name" v-model="pc.pcName">
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label for="playerName" class="label" >Player Name:</label>
                                            <div class="control">
                                                <input type="input" class="input" name="playerName" placeholder="Player Name" v-model="pc.playerName">
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label for="pcClass" class="label" >Class:</label>
                                            <div class="control">
                                                <input type="input" class="input" name="pcClass" placeholder="PC Class" v-model="pc.pcClass">
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label for="pcRace" class="label">Race:</label>
                                            <div class="control">
                                                <input type="input" class="input" name="pcRace" placeholder="PC Race" v-model="pc.pcRace">
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label for="pcDescription" class="label" >Description:</label>
                                            <textarea type="input" class="textarea"  name="pcDescription" placeholder="PC Description" v-model="pc.pcDescription"></textarea>
                                        </div>
                                        <div class="field">
                                            <label for="image" class="image" >Image:</label>
                                            <input type="file" class="file"  ref="file" @change="selectFile()">
                                        </div>
                                        <input type="submit" class="button is-primary" value="Update">
                                        <input type="button" @click="edit" class="button" value="Cancel">
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>

         </div>                 
    </div>
</template>

<script>
// import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name: 'pcs',
    computed: mapState(['pcs']),
    data()
    {
        return {
            isEditing:false
        }
    },
    mounted() {
        this.$store.dispatch('getPcs');
    },
    methods: {
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
        // async editPc(){

        //         const formData = new FormData();
            
        //         formData.append("pcName", this.pcName);
        //         formData.append("playerName", this.playerName);
        //         formData.append("pcClass", this.pcClass);
        //         formData.append("pcRace", this.pcRace);
        //         formData.append("pcDescription", this.pcDescription);
                
        //         // console.log(pc.pcName);
        //         // this.$store.dispatch('editPc',{
                    
        //         // })
        // }
    }
}
</script>

<style lang="scss">
    // .noStyle{
    //     list-style:none;
    // } 
    // .half{
    //     max-width: 600px;
    //     min-width: 400px;
    // }
</style>
