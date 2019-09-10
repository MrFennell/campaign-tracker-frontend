<template>
  <div id="app">
          <div  v-if="!isLoggedIn">
            <img id="logo-img" src="./assets/logo.png" class="image is-128x128" />
            <h1 class="title has-text-centered">Campaign Tracker</h1>
            <p class="p has-text-centered">Plan your games accordingly.</p>
          </div>
      <div>
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'app',
  computed: mapGetters(['isLoggedIn', 'campaignIsSet',]),
  mounted() {
    this.$store.dispatch('loadcurrentuser');
  }
};
</script>

<style lang="scss">

  #logo-img{
    width: 128px;
    margin:auto;
  }
  .header{
    border-bottom: 1px solid #dbdbdb;
    padding-bottom: 20px;
    margin-bottom: 20px;

  }

</style>