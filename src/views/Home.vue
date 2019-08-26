<template>
  <div class="home content">
    
    <div class="container">
        <div v-if="!isLoggedIn">
            <Login></Login>
            <p id="register-link">Don't have an account? Create one <router-link to="/register" data-cy="router-register"> <a>here.</a> </router-link></p>
        </div>
    </div>

    <nav v-if="isLoggedIn" id="navigation" class="navbar is-fixed-top" >
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <img  src="@/assets/logo.png" width="28" height="28">
            </a>

            <a role="button" class="navbar-burger burger" @click="showNav = !showNav"  aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu"  :class="{'is-active':showNav}">
            <div class="navbar-start">
                <!-- <div class="navbar-item has-dropdown is-hoverable" @click="scrollStart('campaign')">
                     <a class="navbar-link">Campaigns </a>
                     <div class="navbar-dropdown">
                         <a  @click="switchCampaign" class="navbar-item">
                            Load another Campaign
                        </a>
                        <a class="navbar-item">
                            New Campaign
                        </a>

                    </div>
                </div> -->
                <a class="navbar-item"  @click="scrollStart('campaign')"> Campaigns </a> 
                <a class="navbar-item"  @click="scrollEnd('pcs')"> PCs </a> 
                <a class="navbar-item"  @click="scrollEnd('npcs')">NPCs</a>
                <a class="navbar-item"  @click="scrollEnd('locations')">Locations</a>
            </div>
            <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button">
                        <Logout />
                    </a>
                </div>
            </div>
            </div>

        </div>
    </nav>
    
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
                <div ref="campaign">
                    <CampaignContainer></CampaignContainer>
                    <div v-if="chooseCampaign">
                         <ListCampaigns></ListCampaigns>
                    </div>
                    <div v-if="showNewCampaignForm">
                        <AddCampaign></AddCampaign>
                    </div>
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
  computed: mapGetters(['isLoggedIn', 'campaignIsSet','getCampaigns']),
    components: {
        PcContainer: () => import('@/components/pc/PcContainer'),
        ListCampaigns: () => import('@/components/campaign/ListCampaigns'),
        AddCampaign: () => import('@/components/campaign/AddCampaign'),
        NpcContainer: () => import('@/components/npc/NpcContainer'),
        CampaignContainer: () => import('@/components/campaign/CampaignContainer'),
        LocationContainer: () => import('@/components/location/LocationContainer'),
        Login: () => import('@/components/user/login'),
        Logout: () => import('@/components/user/Logout')
    },
    data() {
      return {
        username: '',
        password: '',
        error: false,
        chooseCampaign: false,
        showNewCampaignForm: false,
        showNav: false
        };
    },
    methods: {
        switchCampaign(){
            if (!this.chooseCampaign){
                this.chooseCampaign = true;
                this.showNewCampaignForm = false;
            }
            else{
                this.chooseCampaign = false;
            }
        },
        newCampaign(){
            if (!this.showNewCampaignForm){
                this.showNewCampaignForm = true;
                this.chooseCampaign = false;
            }
            else{
                this.showNewCampaignForm = false;
            }
        },
        scrollStart(i){
                this.showNav = false,
                this.$nextTick(() => {
                this.$refs[i].scrollIntoView({behavior: "smooth", block: "end"});
            });
        },
        scrollEnd(i){
                this.showNav = false,
                this.$nextTick(() => {
                this.$refs[i].scrollIntoView({behavior: "smooth", block: "start"});
            });
        }
    },
    mounted() {
        this.$store.dispatch('loadCampaigns');
        this.$store.dispatch('loadCurrentCampaign');
        this.$store.dispatch('campaignThumbnails');
    }

}
</script>
<style lang="scss" scoped>
#register-link{
    text-align: center;
}

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
 