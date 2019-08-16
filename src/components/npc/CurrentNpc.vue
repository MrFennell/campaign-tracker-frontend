<template>
        <div v-if="loadNpc" class="box">
            <div class="is-pulled-right">
                <a class="delete" @click="hideNpc()"></a>
            </div>
            <div class="columns">
                
                    <div class="column is-one-third">
                        <h2 v-if="loadNpc && loadNpc.name">{{ loadNpc.name }}</h2>
                        <h2 v-else><i><font-awesome-icon icon="exclamation-triangle" /></i>error</h2>

                        <div id="image-container">
                                <div id="currentImage" class="image is-square">
                                    <img v-if="loadNpc.imageSrc" :src="loadNpc.imageSrc" />
                                    <img v-else src='../../assets/images/image-default.png'/>
                                </div>
                                <div v-if="imagePreviewUrl" id="currentImage" class="image is-4by3">
                                    <img v-if="imagePreviewUrl" :src="imagePreviewUrl" />
                                </div>

                            <a v-if="!showChangeImageForm" @click="showChangeImageForm = true">Change image</a>
                            
                            <div v-if="showChangeImageForm" class="field">
                                <label for="image" class="image" >Image:</label>
                                <input type="file" class="file" ref="file" @change="selectNewImage">
                                <button class="button" @click="updateNpcImage">Update</button>.
                                <button class="button is-light" @click="hideNewImage()">Cancel</button>
                            </div>
                        </div>
                        <p>{{updateMessage}}</p>
                    </div>
                    <div class="column is-one-third">
                        <currentNpcForm v-bind:scrollTarget= "this.scrollTarget"></currentNpcForm>
                    </div>
                </div>
            </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentNpcForm from '@/components/npc/CurrentNpcForm.vue'
export default {
    components: {CurrentNpcForm},
    name: "CurrentNpc",
    props: 
        ['scrollTarget']
    ,
    computed: {
        ...mapGetters([
            'getNpcId',
            'getNpcById'
        ]),
        loadNpc(){
            const id = this.$store.getters.getNpcId;
            return this.$store.getters.getNpcById(id);
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
        async hideNpc(){
            if (this.isEditing){
               if (confirm("Discard changes to Player Character?")){
                   this.isEditing = false,
                   this.$store.dispatch('setNpcNull', null);  

               }
            }
            else{
                this.$store.dispatch('setNpcNull', null);     
            }
            
        },

        async updateNpcImage (){
            this.errors = [];
            const formData = new FormData();
            if (this.file){
                const npcId = this.loadNpc.id;
                const oldImage = this.loadNpc.imageSrc;
                if(oldImage != null){
                    formData.append('oldImage', oldImage);
                }
                formData.append('NpcId', npcId);
                formData.append('file', this.file);
                try{
                    this.$store.dispatch('updateNpcImage', formData)
                        .then(
                            this.isEditing = false,
                            this.updateMessage = '',
                            this.imagePreviewUrl = null,
                            this.showChangeImageForm = false,
                            this.file = null,
                            this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"}),
                            setTimeout(() => this.updateMessage = null, 3000),
                            (error) => this.error = error.response.data.error,
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