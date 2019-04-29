<template>
    <div class="content">
        <h2 >{{ loadCampaign.title }}</h2>
    
            <p class="tag switch" @click="switchCampaign">Switch Campaign</p>
            <p class="tag new" @click="newCampaign">Start New</p>

        <p class="tag logout" data-cy="router-logout"><a @click="doLogout">Logout</a></p>
        <!-- <div v-if="chooseCampaign">
            <ListCampaigns></ListCampaigns>
        </div>
        <div v-if="showNewForm">
            <AddCampaign></AddCampaign>
        </div> -->
        
    </div>
</template>

<script>

export default {
    name: "CurrentCampaign",
    computed: {
        loadCampaign(){
            return this.$store.state.campaign;
        },
    },
    data(){

    }
}

</script>
<style lang="scss">

</style>