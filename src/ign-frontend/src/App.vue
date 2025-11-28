<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<style lang="scss">
/* app */
</style>

<script>
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
/* Alert import TÖRÖLVE */

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    /* Alert komponens TÖRÖLVE */
  },
};
</script>