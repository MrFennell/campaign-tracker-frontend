<template>
    <div class="content">
        <h2 >{{ loadCampaign.title }}</h2>
   
            <p class="tag switch" @click="switchCampaign">Switch Campaign</p>
            <p class="tag new" @click="newCampaign">Start New</p>

        <p class="tag logout" data-cy="router-logout"><a @click="doLogout">Logout</a></p>
        <div v-if="chooseCampaign">
            <ListCampaigns></ListCampaigns>
        </div>
        <div v-if="showNewForm">
            <AddCampaign></AddCampaign>
        </div>
        
    </div>
</template>

<script>

export default {
    name: "CurrentCampaign",
    computed: {
        loadCampaign(){
            return this.$store.state.campaign;
        }
    },
    data(){
        return{
            chooseCampaign: false,
            showNewForm: false
        }
    },
    components: {
        ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        AddCampaign: () => import('@/components/campaign/AddCampaign')
    },
    methods: {
        switchCampaign(){
            if (!this.chooseCampaign){
                this.chooseCampaign = true;
                this.showNewForm = false;
            }
            else{
                this.chooseCampaign = false;
            }
        },
        newCampaign(){
            if (!this.showNewForm){
                this.showNewForm = true;
                this.chooseCampaign = false;
            }
            else{
                this.showNewForm = false;
            }
        },
        doLogout() {
            if (confirm("Are you sure you want to log out?")){
                this.$store.dispatch('logout')
            }
            
        }
    }
}

</script>
<style lang="scss">

</style>