<template>
        <div v-if="loadPc" class="box">
            <div class="is-pulled-right">
                <a class="delete" @click="hidePc()"></a>
            </div>
            <div class="columns">
                <div id="image-container" class="column is-one-third">
                    <h2 v-if="loadPc && loadPc.name">{{ loadPc.name }}</h2>
                    <h2 v-else><i><font-awesome-icon icon="exclamation-triangle" /></i>error</h2>

                    <div id="image-container">
                        <div id="currentImage" class="image is-square">
                            <img v-if="loadPc.imageSrc" :src="'https://campaign-tracker.s3.us-east-2.amazonaws.com/pcs/'+loadPc.imageSrc"  />
                            <img v-else src='../../assets/images/image-default.png'/>
                        </div>
                        <div v-if="imagePreviewUrl" class="image is-4by3">
                            <img v-if="imagePreviewUrl" :src="imagePreviewUrl" />
                        </div>

                        <a v-if="!showChangeImageForm" @click="showChangeImageForm = true">Change image</a>
                        
                        <div v-if="showChangeImageForm" class="field">
                            <label for="image" class="image" >Image:</label>
                            <input type="file" class="file" ref="file" @change="selectNewImage">
                            <button class="button" @click="updatePcImage">Update</button>.
                            <button class="button is-light" @click="hideNewImage()">Cancel</button>
                        </div>
                    </div>
                    <p>{{updateMessage}}</p>
                    </div>
                <div class="column is-one-third">
                    <currentPcForm v-bind:scrollTarget= "this.scrollTarget"/>
                </div>
                <div class="column is-one-third">
                    <CurrentPcRelationships/>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentPcForm from '@/components/pc/CurrentPcForm.vue'
import CurrentPcRelationships from '@/components/pc/CurrentPcRelationships.vue'
export default {
    components: {CurrentPcForm, CurrentPcRelationships},
    name: "CurrentPc",
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
        },
        npcs(){
            return this.$store.state.npcs
        }
    },
    data() {
        return {
            file: null,
            deleteAlert: false,
            updateMessage: '',
            errors: [],
            error: '',
            defaultThumbnail: "src='./assets/logo.png'",
            showChangeImageForm: false,
            imagePreviewUrl: null,
            selected:null
        }
    },

    methods:{
        selectNewImage(){
            this.file = this.$refs.file.files[0];
            this.newImage = true;
            const imagePreview = this.$refs.file.files[0]; //setting up image preview
            this.imagePreviewUrl = URL.createObjectURL(imagePreview);
            this.updateMessage = '';
        },
        hideNewImage(){
            this.imagePreviewUrl = null;
            this.showChangeImageForm = false;
            this.file = null;
            this.updateMessage = '';
        },
        async hidePc(){
            if (this.isEditing){
               if (confirm("Discard changes to Player Character?")){
                   this.isEditing = false,
                   this.$store.dispatch('setPcNull', null);  
               }
            }
            else{
                this.$store.dispatch('setPcNull', null);     
            }
        },
        async updatePcImage (){
            this.errors = [];
            const formData = new FormData();
            if (this.file){
                const pcId = this.loadPc.id;
                const oldImage = this.loadPc.imageSrc;
                if(oldImage != null){
                    formData.append('oldImage', oldImage);
                }
                formData.append('PcId', pcId);
                formData.append('file', this.file);
                try{
                    this.$store.dispatch('updatePcImage', formData)
                        .then(
                            this.isEditing = false,
                            this.updateMessage = '',
                            this.imagePreviewUrl = null,
                            this.showChangeImageForm = false,
                            this.file = null,
                            (error) => this.error = error.response.data.error
                        )
                }catch(err){
                    this.updateMessage = "Error updating Image."
                    console.log(err);
                }
            }else{
                this.updateMessage = "No new image."
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