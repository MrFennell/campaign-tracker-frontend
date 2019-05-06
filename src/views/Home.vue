<template>
  <div class="home content">
    <div v-if="!isLoggedIn">
        <Login></Login>
    </div>
    
    <div v-if="isLoggedIn">
        <!-- <div v-if="chooseCampaign">
            <ListCampaigns></ListCampaigns>
        </div>

        <div v-if="!campaignIsSet">
            <p>Create a campaign below:</p>
            <ListCampaigns></ListCampaigns>
        </div> -->

        <div v-if="campaignIsSet">
            <p>Welcome back.</p>
            <!-- <CurrentCampaign></CurrentCampaign> -->
            <CampaignContainer></CampaignContainer>
            <PcContainer></PcContainer>
            
        </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'home',
  computed: mapGetters(['isLoggedIn', 'campaignIsSet']),
    components: {
        // ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        // ListPcs: () => import('@/components/pc/ListPcs'),
        PcContainer: () => import('@/components/pc/PcContainer'),
        // CurrentCampaign: () => import('@/components/campaign/CurrentCampaign'),
        CampaignContainer: () => import('@/components/campaign/CampaignContainer'),
        Login: () => import('@/components/user/login')

    },
    data() {
      return {
        username: '',
        password: '',
        error: false,
        currentCampaign: null,
        campaigns: [],
        campaign: '',
        pc: '',
        pcs: [],
        };
    },
    methods: {
        doLogin() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })

            .then(() => this.$router.push('/'))
            .catch(error => this.error = error.response.data.message);
        },
        switchCampaign(){
            if (!this.chooseCampaign){
                this.chooseCampaign = true;
            }
            else{
                this.chooseCampaign = false;
            }
        }

    },
    mounted() {
        this.$store.dispatch('loadCampaigns');
        // this.$store.dispatch('loadPcs');
        this.$store.dispatch('loadCurrentCampaign');
    }

}
</script>
