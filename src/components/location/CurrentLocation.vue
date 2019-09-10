<template>
        <div v-if="location" class="box">
            <div class="is-pulled-right">
                <a class="delete" @click="hideLocation()"></a>
            </div>
            <div class="columns">
                <div class="column is-one-third">
                    <h2 v-if="location && location.name">{{ location.name }}</h2>
                    <h2 v-else><i><font-awesome-icon icon="exclamation-triangle" /></i>error</h2>

                    <div id="image-container">
                            <div id="currentImage" class="image is-square">
                                <img v-if="location.imageSrc" :src="'https://campaign-tracker.s3.us-east-2.amazonaws.com/locations/'+location.imageSrc" />
                                <img v-else src='../../assets/images/image-default.png'/>
                            </div>
                            <div v-if="imagePreviewUrl" id="currentImage" class="image is-4by3">
                                <img v-if="imagePreviewUrl" :src="imagePreviewUrl" />
                            </div>

                        <a v-if="!showChangeImageForm" @click="showChangeImageForm = true">Change image</a>
                        
                        <div v-if="showChangeImageForm" class="field">
                            <label for="image" class="image" >Image:</label>
                            <input type="file" class="file" ref="file" @change="selectNewImage">
                            <button class="button" @click="updateLocationImage">Update</button>.
                            <button class="button is-light" @click="hideNewImage()">Cancel</button>
                        </div>
                    </div>
                    <p>{{updateMessage}}</p>
                </div>

                <div class="column is-one-third">
                    <currentLocationForm v-bind:scrollTarget= "this.scrollTarget" />
                </div>
                <div class="column is-one-third">
                    <CurrentLocationRelationships/>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentLocationForm from '@/components/location/CurrentLocationForm.vue'
import CurrentLocationRelationships from '@/components/location/CurrentLocationRelationships.vue'
export default {
    components: {CurrentLocationForm, CurrentLocationRelationships},
    name: "CurrentLocation",
    computed: {
        ...mapGetters([
            'getLocationId',
            'getLocationById'
        ]),
        location(){
            const id = this.$store.getters.getLocationId;
            return this.$store.getters.getLocationById(id);
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
            showChangeImageForm: false,
            newImage: false,
            imagePreviewUrl: null
        }
    },
    methods:{
        selectNewImage(){
            this.file = this.$refs.file.files[0];
            this.newImage = true;
            const imagePreview = this.$refs.file.files[0];  //setting up image preview
            this.imagePreviewUrl = URL.createObjectURL(imagePreview);
            this.updateMessage = '';
        },
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                this.isEditing = false;
            }
        },
        hideNewImage(){
            this.imagePreviewUrl = null;
            this.showChangeImageForm = false;
            this.file = null;
            this.updateMessage = '';
        },
        async hideLocation(){
            if (this.isEditing){
               if (confirm("Discard changes to Player Character?")){
                   this.isEditing = false,
                   this.$store.dispatch('setLocationNull', null);  
               }
            }
            else{
                this.$store.dispatch('setLocationNull', null);     
            }
        },

        async updateLocationImage (){
            const formData = new FormData();
            if (this.file){
                const locationId = this.location.id;
                const oldImage = this.location.imageSrc;
                if(oldImage != null){
                    formData.append('oldImage', oldImage);
                }
                formData.append('locationId', locationId);
                formData.append('file', this.file);
                try{
                    this.$store.dispatch('updateLocationImage', formData)
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