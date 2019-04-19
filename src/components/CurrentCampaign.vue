<template>
    <div class="content">
        <div>
        <h2>Current Campaign:</h2>
                <div class="box"> 
                    <!-- <router-link class="title" :to="{ name: 'campaign', params: { id: campaign.id }}">{{ campaign.title }}</router-link> -->
                    <p>{{ loadCampaign.title }}</p>
                    <!-- <button class="button" @click="setCurrentCampaign(campaign)">Set to Current</button> -->
                    </div>
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
    }
}

</script>
