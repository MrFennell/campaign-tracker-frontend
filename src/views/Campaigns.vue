<template>
    <div class="content">
        <ul>
            <li v-for="campaign in campaigns" v-bind:key="campaign.id">
                <router-link :to="{ name: 'campaign', params: { id: campaign.id }}">{{ campaign.title }}</router-link>
                <p>{{ campaign.description }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'campaigns',
    computed: mapState(['campaigns']),
    mounted() {
        this.$store.dispatch('getCampaigns');
    }
}
</script>

<style>

</style>
