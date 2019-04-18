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
        <!-- <div v-if="!campaignIsSet"> -->
            <ListCampaigns></ListCampaigns>
        <!-- </div> -->
        <div>
            <p>Campaign loaded: {{currentCampaignName}}</p>
            <p><a>Change campaign.</a></p>
        </div>
        <div v-if="campaignIsSet">
            <ListPcs></ListPcs>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'home',
  computed: mapGetters(['isLoggedIn', 'campaignIsSet', 'currentCampaignName']),
    components: {
        ListCampaigns: () => import('@/components/ListCampaigns'),
        ListPcs: () => import('@/components/ListPcs')
    },
    data() {
      return {
        username: '',
        password: '',
        error: false,
        campaigns: [],
        campaign: '',
        pc: '',
        pcs: []
        };
    },
    methods: {
        check(){
            // let user1 = this.$store.state.user.id;
            let user1 = this.$store.getters.getCampaignName;
            console.log("Campaign: "+ user1);
        },
        doLogin() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
            .then(() => this.$router.push('/'))
            .catch(error => this.error = error.response.data.message);
        }
    },
    mounted() {
        this.$store.dispatch('loadCampaigns');
        this.$store.dispatch('loadPcs');
        this.$store.dispatch('loadCurrentCampaign');
  }
        

}
</script>
