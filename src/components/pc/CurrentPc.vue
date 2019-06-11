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

                            <div v-if="loadPc && loadPc.imageSrc">
                                <div v-if="loadPc.imageSrc" id="currentImage" class="image is-square">
                                    <img :src="loadPc.imageSrc" />
                                </div>

                                <div v-if="newImage" id="currentImage" class="image is-4by3">
                                    <img v-if="url" :src="url" />
                                </div>
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
                    <CurrentPcForm></CurrentPcForm>
                    <component v-bind:is="CurrentPcForm"></component>   
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentPcForm from '@/components/pc/CurrentPcForm.vue';

export default {
    components: {CurrentPcForm},
    name: "CurrentPc",
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