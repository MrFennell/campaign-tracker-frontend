<template>
    <div class="content" id="campaign-header">
        <div v-if="!isEditing" id="campaign-info">
            <div id="edit-title">
                <h2 >{{ loadCampaign.title }}</h2>
                <a id="edit-icon"><font-awesome-icon icon="edit" @click="edit()"/></a>
            </div>
            <p>{{ loadCampaign.description}}</p>
        </div>
        <div v-if="isEditing">
            <CurrentCampaignForm />
            <a @click="isEditing = false">Quit Editing</a>
        </div>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentCampaignForm from '@/components/campaign/CurrentCampaignForm.vue';
export default {
    name: "CurrentCampaign",
    components: {CurrentCampaignForm},
    computed: {
    ...mapGetters([
        'getCampaignId',
        'getCampaignById'
    ]),
        loadCampaign(){
            const id = this.$store.getters.getCampaignId;
            return this.$store.getters.getCampaignById(id);
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
        }
    }
}

</script>
<style lang="scss">
   #campaign-header{
       display:flex;
       justify-content:center;
       margin-top: 15px;
   }
   #edit-title{
       display:flex;
   }
   #edit-icon{
       display:none;
   }
    #campaign-info:hover{
        #edit-icon{
        display:block;
        }
    }
</style>