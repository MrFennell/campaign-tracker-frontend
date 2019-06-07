<template>
  <div class="home content">
    <div v-if="!isLoggedIn">
        <Login></Login>
    </div>
    <div id="sidebar">
    <!-- <ul>
        <li><router-link to="/" exact-active-class="is-active">Campaign</router-link></li>
        <li><router-link to="ListPcs" exact-active-class="is-active">PCs</router-link></li>
    </ul> -->
    </div>

    <div v-if="isLoggedIn">
        <div v-if="chooseCampaign">
            <ListCampaigns></ListCampaigns>
        </div>

        <div v-if="!campaignIsSet">
            <AddCampaign></AddCampaign>
            <CampaignContainer></CampaignContainer>
        </div>

        <div v-if="campaignIsSet">
            <!-- <router-view></router-view> -->
            <p>Welcome back.</p>
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
  computed: mapGetters(['isLoggedIn', 'campaignIsSet', 'pcList',]),
    components: {
        PcContainer: () => import('@/components/pc/PcContainer'),
        ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        AddCampaign: () => import('@/components/campaign/AddCampaign'),
        CampaignContainer: () => import('@/components/campaign/CampaignContainer'),
        Login: () => import('@/components/user/login')

    },
    data() {
      return {
        username: '',
        password: '',
        error: false,
        currentCampaign: null,
        chooseCampaign: null,
        campaigns: [],
        campaign: '',
        pc: '',
        pcs: [],
        list: 'full'
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
