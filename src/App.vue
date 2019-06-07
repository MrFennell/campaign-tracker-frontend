<template>
  <div id="app">
      <div class="container is-fullhd">
        <div>
          <div class='header'>
              <!-- <NavBar></NavBar> -->

              <router-link to="/">
                <img id="logo-img" src="./assets/logo.png" class="image is-128x128" />
              </router-link>
              <h1 class="title has-text-centered">Campaign Tracker</h1>
              
              <p class="p has-text-centered">Plan your games accordingly.</p>
           </div>
          </div>


            <!-- <div class="columns -is-center"> -->
              <div class="columns" >
                <!-- <div class=" column is-one-fifth">
                  <ul>
                      <li><router-link to="/" exact-active-class="is-active">Campaign</router-link></li>
                      <li><router-link to="/pcs" exact-active-class="is-active">PCs</router-link></li>
                  </ul>
                </div>

               -->
          
              <!-- <div class="column is-four-fifths"> -->
                <router-view></router-view>
              </div>
            </div>
            <!-- </div> -->

          
 
      <!-- </div> -->
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