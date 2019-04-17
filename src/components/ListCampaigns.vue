<template>
    <div class="content">
        <h2>Campaigns</h2>
        <p>Choose a campaign below to load your data!</p>
        <div>
            <div v-for="campaign in loadCampaigns" v-bind:key="campaign.id">
              <div class="box">  
                <router-link class="title" :to="{ name: 'campaign', params: { id: campaign.id }}">{{ campaign.title }}</router-link>
                <p>{{ campaign.description }}</p>
                <button class="button">Set to Current</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: "ListCampaigns",
    computed: {
        loadCampaigns(){
            return this.$store.state.campaigns;
        }
    }
}

</script>
