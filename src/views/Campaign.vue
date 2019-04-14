<template>
    <div class="content">
        <p v-if="campaign.title">Campaign: {{ campaign.title }}</p>
        <p v-else>Untitled</p>
        <p v-if="campaign.description">Description: {{campaign.description}}</p>
        <p v-else>(no details)</p>
  
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'campaign',
    props: ['id'],
    data() {
        return {
            campaign: {}
        };
    },

    async mounted() {
        const response = await axios.get(`/campaigns/${this.$route.params.id}`);
        this.campaign = response.data;
    }
}
</script>

<style>


</style>
