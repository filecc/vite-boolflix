<template>
 <div class="d-flex justify-content-between align-items-center p-2">
    <router-link to="/">
      <Navbar />
    </router-link>
    <router-link class="btn btn-outline-primary" to="/search">
      <i class="bi bi-search"></i>
    </router-link>
  </div>
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue';
export default {
  components: {
    Navbar,
  }
}
 
</script>

<style lang="scss" scoped>

</style>