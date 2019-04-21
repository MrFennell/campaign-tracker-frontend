<template>
  <div class="home content">
    <div v-if="!isLoggedIn">
      <p class="p has-text-centered">Please log in below:</p>
      <form @submit.prevent="doLogin">
        <p v-if="error" class="has-text-danger has-text-centered">{{ error }}</p>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Username</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="text" v-model="username"/>
                    </div>
                </div>
            </div>            
        </div>
        <div class="field is-horizontal">
            <div class="field-label">
                <label class="label">Password</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input" type="password" v-model="password"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-label"></div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <button class="button is-primary">Login</button>
                    </div>
                </div>
            </div>
        </div>
      </form>
    
    </div> <!-- end of script for user that's not logged in-->

    <div v-if="isLoggedIn">

        <div v-if="!campaignIsSet">
        <p>Welcome back.</p>
            <ListCampaigns></ListCampaigns>
        </div>

        <div v-if="campaignIsSet">
            <CurrentCampaign></CurrentCampaign>
            <ListPcs></ListPcs>
            
        </div>
        <div v-if="chooseCampaign">
        <ListCampaigns></ListCampaigns>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'home',
  computed: mapGetters(['isLoggedIn', 'campaignIsSet', 'getPc']),
    components: {
        ListCampaigns: () => import('@/components/ListCampaigns'),
        ListPcs: () => import('@/components/ListPcs'),
        CurrentCampaign: () => import('@/components/CurrentCampaign')
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
        componentKey: 0,
        chooseCampaign: false
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
        this.$store.dispatch('loadPcs');
        this.$store.dispatch('loadCurrentCampaign');
    }

}
</script>
