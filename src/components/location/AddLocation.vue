<template>
    <div>
        <p v-if="successMessage">{{successMessage}}</p>    

        <div class="add-form-container">
            
            <div ref="formTop" class="add-form-header">
                <p>Create a new location below.</p>
                <a class="delete" @click="$emit('hideForm')"></a>
            </div>
            
            <div v-if="errors.length" class="error-text">
                <div>
                    <b><i><font-awesome-icon icon="exclamation-triangle" /></i></b>
                </div>
                <div>
                    <b v-if="errors.length > 1"><p>Please correct the following errors:</p></b>
                    <b v-else><p>Please correct the following error:</p></b>
                    <ul >
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                </div>
            </div>
            <form @submit.prevent="newLocation" enctype="multipart/form-data">
                <div class="field">
                    <label class="label" for="name">Name:</label>
                    <div class="control">
                        <input type="input" class="input" name="name" placeholder="Name of location" v-model="name">
                    </div>
                </div>
                <div class="field">
                    <label for="race" class="label">Region:</label>
                    <div class="control">
                        <input type="input" class="input" name="region" placeholder="Region or area" v-model="region">
                    </div>
                </div>
                <div class="field">
                    <label for="image" class="image" >Image:</label>
                    <input type="file" class="file"  ref="file" @change="selectFile">
                </div>
                <input type="submit" class="button is-primary" value="Create">
                <input type="submit" class="button" value="Hide" @click="$emit('hideForm')">
                
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: "AddLocation",
    props: 
        ['showForm','successMessage','scrollTarget']
    ,
    data(){
        return{
            name: '',
            region: '',
            file: null,
            errors: [],
            error: '',
        }
    },
    methods: {
        selectFile(){
            this.file = this.$refs.file.files[0];
        },
        errorScroll(){
            this.$nextTick(() => {
                this.scrollTarget.scrollIntoView({behavior: "smooth", block: "start"});
            });
        },
        async newLocation(){ 
            this.errors = [];
            if (!this.name){
                this.errors.push('Enter a name for the location.');
                this.errorScroll();
            }
            else{
                this.errors = [];            
                const formData = new FormData();
                formData.append("name", this.name);
                formData.append("region", this.race);
                
                if (this.file){
                    formData.append('file', this.file);
                    try{
                        this.$store.dispatch('addLocation', formData),
                        this.file = null;
                        this.errors = [];
                        this.$emit('update:successMessage', "Location created!");
                        this.$emit('hideForm');
                    }catch(err){
                        console.log(err);
                    }
                }
            }
        }
    }
}
</script>

// <style lang="scss">



// </style>