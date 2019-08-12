<template>
    <div id="campaign-header">
        <div id="campaign-header-content">
            <div v-if="!isEditing" id="campaign-info">
                <div id="edit-title">
                    <h1 id="campaign-title">{{ loadCampaign.title }}</h1>
                    <a id="edit-icon"><font-awesome-icon icon="edit" @click="edit()"/></a>
                </div>
                <p id="campaign-description">{{ loadCampaign.description}}</p>
            </div>
            <div v-if="isEditing">
                <CurrentCampaignForm></CurrentCampaignForm>
                <div class="level">
                <a @click="isEditing = false">Quit Editing</a>

                <input type="button" class="button is-warning" value="Delete" @click="deleteCampaign">
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
// import { mapGetters } from 'vuex'
import CurrentCampaignForm from '@/components/campaign/CurrentCampaignForm.vue';
export default {
    name: "CurrentCampaign",
    components: {CurrentCampaignForm},
    computed: {
    loadCampaign(){
        return this.$store.state.campaign;
    },
    },
    data(){
        return{
            title: '',
            description: '',
            isEditing: false
        }
    },
    methods: {
        edit(){
            if (!this.isEditing){
                this.isEditing = true;
            }
            else{
                this.isEditing = false;
            }
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
    #campaign-header{
    // width: 100%;
    }
    #campaign-header-content{
    width: fit-content;
    margin: auto;
    margin-top: 3em;
    position: relative;
    }
   #campaign-title{
       
       margin:auto;
   }
   #edit-title{
       display:flex;
       align-items: center;
       width: fit-content;
       margin: auto;
   }
   #edit-icon{
    visibility: hidden;
    position: absolute;
    top: 0;
    right: -2em;    
   }
   #campaign-info{
       text-align: center;
   }
   #campaign-description{
       margin-top: 4px;
       font-size: 1.3em;
   }
    #campaign-header:hover{
        #edit-icon{
        visibility: visible
        }
    }
</style>