<template>

<div>
    <li v-for="campaign in campaigns" v-bind:key="campaign.id">
        <router-link :to="{ name: 'campaign', params: { id: campaign.id }}">{{ campaign.title }}</router-link>
        <p>{{ campaign.description }}</p>
    </li>
</div>
    
</template>

<script>
export default {

    name: "ListCampaigns",
    computed: {
        loadCampaigns(){
            return this.$store.campaigns;
        }
    }
}

</script>
