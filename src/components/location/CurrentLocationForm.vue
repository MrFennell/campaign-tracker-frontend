<template>
        <div v-if="loadLocation">
            <div class="columns">
                <div>
                   <p class="update-message">{{updateMessage}}</p>
                    <a v-if="!isEditing" @click="edit">Edit</a>
                    <div v-if="isEditing">
                        <a @click="isEditing = false">Quit Editing</a>
                        
                        <p v-if="errors.length">
                            <i><font-awesome-icon icon="exclamation-triangle" /></i><b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                            </ul>
                        </p>
                        <form @submit.prevent="updateLocation" enctype="multipart/form-data">
                            <div class="field">
                                <label class="label" for="name">Name:</label>
                                <div class="control">
                                    <input type="input" class="input" name="name" placeholder="Name of the location." v-model="loadLocation.name">
                                </div>
                            </div>
                            <div class="field">
                                <label for="region" class="label">Region:</label>
                                <div class="control">
                                    <input type="input" class="input" name="region" placeholder="Region or area of the location." v-model="loadLocation.region">
                                </div>
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
                                    <!-- <input type="button" class="button" value="Discard Changes" @click="hideLocation"> -->
                                </p>
                                <p class="control">
                                    <input type="button" class="button is-warning" value="Delete" @click="deleteLocation">
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: "CurrentLocation",
    computed: {
        ...mapGetters([
            'getLocationById',
            'getLocationId'
        ]),
        loadLocation(){
            const id = this.$store.getters.getLocationId;
            return this.$store.getters.getLocationById(id);
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
        async updateLocation(){ 
            if (!this.loadLocation.name){
                this.errors.push('Name is required.');
            }else{
               if (this.newImage === true){
                    const formData = new FormData();

                    if (this.file){
                        const locationId = this.loadLocation.id;
                        const oldImage = this.loadLocation.imageSrc;

                        formData.append('LocationId', locationId);
                        formData.append('oldImage', oldImage);
                        formData.append('file', this.file);
                        formData.append("name", this.loadLocation.name);
                        formData.append("region", this.loadLocation.region);
                        try{
                            this.$store.dispatch('updateLocationWithImage', formData)
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
                    this.$store.dispatch('updateLocation', this.loadLocation)
                    .then(
                        this.isEditing = false,
                        this.updateMessage = "Updated.",
                        setTimeout(() => this.updateMessage = null, 3000),
                        (error) => this.error = error.response.data.error
                    )
               }
            }
        },
        async deleteLocation(){ 

           if  (confirm('Delete Location?')) {
            this.$store.dispatch('deleteLocation', this.loadLocation)
                .then(
                    this.isEditing = false,
                    this.updateMessage = '',
                    this.$store.dispatch('setLocationNull', null),  
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