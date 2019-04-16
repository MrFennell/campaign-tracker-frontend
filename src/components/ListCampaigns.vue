<template>
    <div class="content">
        <h2>Campaigns</h2>
        <p>Choose a campaign below to load your data!</p>
        <div>
            <li v-for="campaign in loadCampaigns" v-bind:key="campaign.id">
              <div class="box">  
                <router-link class="title is-small" :to="{ name: 'campaign', params: { id: campaign.id }}">{{ campaign.title }}</router-link>
                <p>{{ campaign.description }}</p>
                <button class="button">Set to Current</button>
                </div>
            </li>

        </div>
    </div>
</template>

<script>
export default {

    name: "ListCampaigns",
    props: ['id','title','description'],

    computed: {
        loadCampaigns(){
            return this.$store.state.campaigns;
        }
    }
}

</script>
