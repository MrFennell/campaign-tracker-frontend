<template>
  <div class="home content">
    
    <nav   v-if="isLoggedIn" id="navigation" class="navbar is-fixed-top" >
        <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
                <img  src="@/assets/logo.png" width="28" height="28">
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" @click="scrollStart('campaign')"> Campaign </a>
                <a class="navbar-item"  @click="scrollEnd('pcs')"> PCs </a> 
                <a  class="navbar-item"  @click="scrollEnd('npcs')">NPCs</a>
                <a class="navbar-item"  @click="scrollEnd('locations')">Locations</a>
            </div>
        </div>
    </nav>
    
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
        Login: () => import('@/components/user/login'),
    },
    data() {
      return {
        username: '',
        password: '',
        error: false,
        chooseCampaign: ''
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
        scrollStart(i){
                this.$nextTick(() => {
                this.$refs[i].scrollIntoView({behavior: "smooth", block: "end"});
            });
        },
        scrollEnd(i){
                this.$nextTick(() => {
                this.$refs[i].scrollIntoView({behavior: "smooth", block: "start"});
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
// #navigation{
//     max-width:100px;
//     position: fixed;
//     top: 25%;
//     left: 0;
//     z-index: 9999;
//     ul{
//         list-style-type: none;
//         list-style: none;
//     }
// }
</style>
 