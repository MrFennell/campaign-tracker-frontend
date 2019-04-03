<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <NavBar></NavBar>
        <router-view></router-view>
        <AddPc></AddPc>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import AddPc from '@/components/AddPc.vue'

export default {
  name: 'app',
  components: { NavBar , AddPc},
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