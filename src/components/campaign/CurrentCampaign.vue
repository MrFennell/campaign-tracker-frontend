<template>
    <div class="content">
        <h2 >{{ loadCampaign.title }}</h2>
        <p>{{ loadCampaign.description}}</p>
        <CurrentCampaignForm />
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'
import CurrentCampaignForm from '@/components/campaign/CurrentCampaignForm.vue';
export default {
    name: "CurrentCampaign",
    components: {
            CurrentCampaignForm
    },
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
            description: ''
        }
    }
}

</script>
<style lang="scss">

</style>