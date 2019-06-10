<template>
    <div class="content">
        <CurrentCampaign></CurrentCampaign>
        <p class="tag switch" @click="switchCampaign"><a>Switch Campaign</a></p>
        <p class="tag new" @click="newCampaign"><a>Start New</a></p>
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
    name: "CampaignContainer",
    data(){
        return{
            chooseCampaign: false,
            showNewForm: false
        }
    },
    components: {
        ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        CurrentCampaign: () => import('@/components/campaign/CurrentCampaign'),
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