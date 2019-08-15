<template>
    <div>
        <p v-if="successMessage">{{successMessage}}</p>    

        <div>
            <p ref="formTop">Create a new Non-Player Character below.</p>
            <div class="is-pulled-right">
                <a class="delete" @click="$emit('update:showForm', false)"></a>
            </div>
            <p v-if="errors.length">
                <b><i><font-awesome-icon icon="exclamation-triangle" /></i>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                </ul>
            </p>
            <form @submit.prevent="newNpc" enctype="multipart/form-data">
                <div class="field">
                    <label class="label" for="name">Name:</label>
                    <div class="control">
                        <input type="input" class="input" name="pcName" placeholder="NPC Name" v-model="name">
                    </div>
                </div>
                <div class="field">
                    <label for="race" class="label">Race:</label>
                    <div class="control">
                        <input type="input" class="input" name="race" placeholder="NPC Race" v-model="race">
                    </div>
                </div>
                <div class="field">
                    <label for="description" class="label" >Description:</label>
                    <textarea  class="textarea"  name="description" placeholder="Physical Description" v-model="description"></textarea>
                </div>
                <div class="field">
                    <label for="lifestate" class="label">Life State:</label>
                    <div class="control">
                        <input type="input" class="input" name="lifeState" placeholder="Dead or alive? Somewhere in between?" v-model="lifeState">
                    </div>
                </div>
                <div class="field">
                    <label for="sharedBio" class="label" >Shared Biography:</label>
                    <textarea  class="textarea"  name="sharedBio" placeholder="All players and GMs will see this." v-model="sharedBio"></textarea>
                </div>
                <div class="field">
                    <label for="privateBio" class="label" >Private Biography:</label>
                    <textarea  class="textarea"  name="privateBio" placeholder="Biography that will only be shared between the GM and the player." v-model="privateBio"></textarea>
                </div>
                <div class="field">
                    <label for="image" class="image" >Image:</label>
                    <input type="file" class="file"  ref="file" @change="selectFile">
                </div>
                <input type="submit" class="button is-primary" value="Create" >
                <input type="submit" class="button" value="Hide" @click="$emit('update:showForm', false)">
                
                
            </form>
        </div>
    </div>
</template>
<script>
    export default {
        name: "AddNpc",
        props: 
        ['showForm','successMessage']
        ,
        data(){
            return{
                name: '',
                race: '',
                profession: '',
                description: '',
                lifeState: '',
                sharedBio: '',
                privateBio: '',
                file: null,
                errors: [],
                error: '',
            }
        },
        methods: {

            selectFile(){
                this.file = this.$refs.file.files[0];
            },
            async newNpc(){ 
                    if (!this.name){
                        this.errors.push('Please enter a name.');
                    }
                    else{

                        this.errors = [];                    
                        const formData = new FormData();
                        formData.append("name", this.name);
                        formData.append("race", this.race);
                        formData.append("profession", this.profession);
                        formData.append("description", this.lifeState);
                        formData.append("sharedBio", this.sharedBio);
                        formData.append("privateBio", this.privateBio);
                        
                        if (this.file){
                            formData.append('file', this.file);
                            try{
                                this.$store.dispatch('addNpcWithImage', formData),
                                this.file = null;
                                this.$emit('update:successMessage', "Character created!");
                                this.$emit('update:showForm', false);
                                this.errors = [];
                            }catch(err){
                                console.log(err);
                            }
                        }
                        else{
                            this.$store.dispatch('addNpc', formData),
                            this.showForm = false;
                            this.file = null;
                            this.$emit('update:successMessage', "Character created!");
                            this.$emit('update:showForm', false);
                        }
                }
            }
        }
    }
</script>

// <style lang="scss">



// </style>