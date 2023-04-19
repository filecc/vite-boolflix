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
import axios from 'axios';
import { useHomeList } from '../stores/list';

export default {
  components: {
    Navbar,
  },
  methods: {
    getInitialList(){ 
      const store = useHomeList();
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d18b4066572abd6df624614e95914560')
      .then(res => {
        store.populate(res.data.results)
      })
  }
},
mounted(){
  this.getInitialList();
}
}
 
</script>

<style lang="scss" scoped>

</style>