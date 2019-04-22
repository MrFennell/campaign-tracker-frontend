<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div>
          <div class='header'>
              <!-- <NavBar></NavBar> -->
              <img id="logo-img" src="./assets/logo.png" class="image is-128x128" />
              <h1 class="title has-text-centered">Campaign Tracker</h1>
              <p class="p has-text-centered">Plan your games accordingly.</p>
           </div>
          </div>
           <div class="columns">
            <div class="column -is-center">
              <router-view></router-view>
            </div>
          </div>

      </div>
    </section>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar.vue'

export default {
  name: 'app',
  // components: { NavBar},

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