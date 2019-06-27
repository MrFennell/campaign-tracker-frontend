<template>
  <div class="home content">
    <div v-if="!isLoggedIn">
        <Login></Login>
    </div>

    <div v-if="isLoggedIn">
        <div v-if="chooseCampaign">
            <ListCampaigns></ListCampaigns>
        </div>

        <div v-if="!campaignIsSet" >
            <div class="container">
                <ListCampaigns></ListCampaigns>
                <AddCampaign></AddCampaign>
            </div>
        </div>

        <div v-if="campaignIsSet">
           <div class="container">
                <nav id="navigation">
                    <ul>
                        <li><a @click="scroll('campaign')"> Campaign </a> </li>
                        <li><a @click="scroll('pcs')"> PCs </a> </li>
                        <li><a @click="scroll('npcs')">NPCs</a></li>
                        <li><a @click="scroll('locations')">Locations</a></li>
                    </ul>
                </nav>
            </div>
            <div class="container">
                <div ref="campaign">
                    <CampaignContainer></CampaignContainer>
                </div>
                <div class="section" ref="pcs">
                    <PcContainer></PcContainer>
                </div>
                <div class="section" ref="npcs">
                    <NpcContainer></NpcContainer>
                </div>
                <div class="section" ref="locations">
                    <LocationContainer></LocationContainer>
                </div>
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
        LocationContainer: () => import('@/components/location/LocationContainer'),
        Login: () => import('@/components/user/login')
    },
    data() {
      return {
        error: false,
        };
    },
    methods: {
        switchCampaign(){
            if (!this.chooseCampaign){
                this.chooseCampaign = true;
            }
            else{
                this.chooseCampaign = false;
            }
        },
        scroll(i){
                this.$nextTick(() => {
                this.$refs[i].scrollIntoView({behavior: "smooth"});
            });
        }

    },
    mounted() {
        this.$store.dispatch('loadCampaigns');
        this.$store.dispatch('loadCurrentCampaign');
    }

}
</script>
<style lang="scss" scoped>
#navigation{
    max-width:100px;
    position: fixed;
    top: 25%;
    left: 0;
    z-index: 9999;
    ul{
        list-style-type: none;
        list-style: none;
    }
}
</style>
 