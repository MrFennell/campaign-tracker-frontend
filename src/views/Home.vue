<template>
  <div class="home content">
    <h1 class="h1 has-text-centered">Campaign Tracker</h1>
    <p class="p has-text-centered">The game master's best friend.</p>
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

     <!-- <form @submit.prevent="AddPc" >
        <label for="pcName">Name:</label>
        <input type="input" name="pcName" placeholder="PC Name" v-model="pcName">
        <label for="pcClass">Class:</label>
        <input type="input" name="pcClass" placeholder="PC Class" v-model="pcClass">
        <label for="pcRace">Race:</label>
        <input type="input" name="pcRace" placeholder="PC Race" v-model="pcRace">
        <label for="pcDescription">Description:</label>
        <input type="input" name="pcDescription" placeholder="PC Description" v-model="pcDescription">
        <input type="submit" value="Create">
    </form> -->
     <ListCampaigns></ListCampaigns>
    <!-- <ul>
        <li v-for="campaign in campaigns" v-bind:key="campaign.id">
            <router-link :to="{ name: 'campaign', params: { id: campaign.id }}">{{ campaign.title }}</router-link>
            <p>{{ campaign.description }}</p>
        </li>
    </ul> -->

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { ListCampaigns } from '@/components/ListCampaigns';
// import { campaigns } from '@/views/Campaigns';

export default {
  name: 'home',
  computed: mapGetters(['isLoggedIn']),
//   components: {campaigns},
    components: {
        ListCampaigns: () => import('@/components/ListCampaigns')
    },
    data() {
      return {
        username: '',
        password: '',
        error: false,
        campaigns: [],
        campaign: '',
        };
    },
    methods: {
        // check(){
        //     // let user1 = this.$store.state.user.id;
        //     let user1 = this.$store.getters.getUserId;
        //     console.log("USER "+ user1);
        // },
        doLogin() {
            this.$store.dispatch('login', {
                username: this.username,
                password: this.password
            })
            .then(() => this.$router.push('/'))
            .catch(error => this.error = error.response.data.message);
        }
        ,
        AddPc(){
            this.$store.dispatch('AddPc', {
                pcName:this.pcName,
                pcClass:this.pcClass,
                pcRace:this.pcRace,
                pcDescription:this.pcDescription
            })
                .then(() => this.$router.push('/Home'))
                .catch(error => this.error = error.response.data.message);
            }
    },
    mounted() {
    this.$store.dispatch('loadCampaigns');
  }
        

}
</script>
