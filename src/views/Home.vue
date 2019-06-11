<template>
  <div class="home content">
    <div v-if="!isLoggedIn">
        <Login></Login>
    </div>


    <div v-if="isLoggedIn">
        <!-- <div id="sidebar">
            <ul>
                <li><router-link to="/" exact-active-class="is-active">Campaign</router-link></li>
                <li><router-link to="ListPcs" exact-active-class="is-active">PCs</router-link></li>
            </ul>
        </div> -->
        <div v-if="chooseCampaign">
            <ListCampaigns></ListCampaigns>
        </div>

        <div v-if="!campaignIsSet" >
            <AddCampaign></AddCampaign>
            <CampaignContainer></CampaignContainer>
        </div>

        <div v-if="campaignIsSet">
            <div id="campaign-header">
                <CampaignContainer></CampaignContainer>
            </div>
            <div class="section">
                <PcContainer></PcContainer>
            </div>
            <div class="section">
                <NpcContainer></NpcContainer>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'home',
  computed: mapGetters(['isLoggedIn', 'campaignIsSet',]),
    components: {
        PcContainer: () => import('@/components/pc/PcContainer'),
        ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        AddCampaign: () => import('@/components/campaign/AddCampaign'),
        NpcContainer: () => import('@/components/npc/NpcContainer'),
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
<style lang="scss" scoped>
   #campaign-header{
       text-align: center;
       margin-top: 15px;
   }
</style>
 