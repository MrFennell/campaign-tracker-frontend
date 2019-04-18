<template>
  <div id="app">
    <section class="section">
      <div class="container">
            <h1 class="h1 has-text-centered">Campaign Tracker</h1>
            <p class="p has-text-centered">Plan your games accordingly.</p>
        <NavBar></NavBar>
        <div class="columns">
          <div class="column -is-center">
            <router-view></router-view>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <AddCampaign></AddCampaign>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AddCampaign from '@/components/AddCampaign.vue'

export default {
  name: 'app',
  components: { NavBar , AddCampaign},

  mounted() {
    this.$store.dispatch('loadcurrentuser');
  }
};
</script>

// <style lang="scss">

// $font-stack: Helvetica, sans-serif;

// body {
//   font: 100% $font-stack;
// }

// </style>