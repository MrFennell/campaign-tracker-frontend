<template>
    <div id="campaign-list-item">
    <div >
        <div v-if="!isEditing" id="campaign-list-info">
             
            <h2 id="campaign-list-title">{{ title }}</h2>

            <a id="campaign-list-edit-icon"><font-awesome-icon icon="edit" @click="edit()"/></a>   
            <p id="campaign-list-description">{{ description}}</p>
                    
        </div>
    </div>
    <form v-if="isEditing" @submit.prevent="updateCampaign">
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label for="title" class="label">Title:</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control ">
                    
                    <input type="input" name="title" @change="setEdit()" class="input" placeholder="Campaign Title" v-model="newTitle">
                    </div>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label is-small">
                <label for="description"  class="label">Description:</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control ">
                        <input type="input" name="description" class="input" @change="setEdit()" placeholder="Campaign Description" v-model="newDescription">
                    </div>
                </div>
            </div>
        </div>
        <div class="buttons">
            <input type="submit" value="Update" class="button is-primary ">
            <input type="button"  @click="edit()" value="Cancel" class="button ">
        </div>
    </form>
</div>
    
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
    name: "CampaignHeader",
    props: 
        ['title',
        'description']
    ,
    data(){
        return{
            isEditing: false,
            newTitle: this.title,
            newDescription: this.description,
            edits: false
        }
    },
    computed:{
        defaultTitle(){
            return this.title;
        }
    },
    methods: {
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                if (this.newTitle !== this.title || this.newDescription !== this.description){
                    if (confirm("Disregard changes?")){
                        this.newTitle = this.title
                        this.newDescription = this.description
                        this.isEditing = false;
                    }
                }
                else{
                    this.isEditing = false;
                }
            }
        },
        setEdit(){
            this.edits = true;
        },
        async deleteCampaign(){ 
           if  (confirm('Delete campaign?')) {
            this.$store.dispatch('deleteCampaign', this.loadCampaign)
                .then(
                    () => this.$router.go(),
                    (error) => this.error = error.response.data.error
                )
           }
           else{
            this.updateMessage = "Delete cancelled."
           }
        }
    }
}

</script>
<style lang="scss">
    h2{
    font-size: 36px;
    }
    #campaign-header-content{
        width: fit-content;
        margin: auto;
        margin-top: 3em;
        position: relative;
    }
   #campaign-list-title{
       float: left;
   }
   #delete-campaign{
   }
//    #edit-title{
//        display:flex;
//        align-items: center;
//        width: fit-content;
//        margin: auto;
//    }
   #campaign-list-edit-icon{
       float: right;
       margin-left: 10px;
       opacity: 0.4;
   }
   #campaign-list-edit-icon:hover{
       opacity: 1;
   }
   #quit-editing-campaign{
       float:right;
       clear: both;
   }
   #campaign-list-info{
       width: 100%;
   }
   #campaign-list-description{
       margin-top: 4px;
       font-size: 1.3em;
       clear: both;
   }
    #campaign-header:hover{
        #edit-icon{
        visibility: visible
        }
    }
</style>