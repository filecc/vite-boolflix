<template>
  <div id="layoutNav" class="d-flex justify-content-between align-items-center p-2">
    <router-link to="/">
      <Navbar />
    </router-link>
    <router-link class="btn btn-outline-primary" to="/search">
      <i class="bi bi-search"></i>
    </router-link>
  </div>

  <router-view />
  <AppFooter />
</template>

<script>
import Navbar from './components/Navbar.vue';
import axios from 'axios';
import { useMovieList, useSeriesList, useMovieToprated } from '../stores/list';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    Navbar,
    AppFooter
  },
  methods: {
    getInitialList() {
      const movies = useMovieList();
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d18b4066572abd6df624614e95914560&language=it-IT&page=1')
        .then(res => {
          movies.populate(res.data.results)

        })

      const series = useSeriesList();
      axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=d18b4066572abd6df624614e95914560&language=it-IT&page=1')
        .then(res => {
          series.populate(res.data.results)

        })

      const topRatedMovie = useMovieToprated();
      axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c60495b897d3871eb954459412ca5d5d&language=it-IT&page=1')
        .then(res => {
          topRatedMovie.populate(res.data.results)

        })
    }
  },
  mounted() {
    this.getInitialList();
  }
}

</script>

<style lang="scss" scoped>
#layoutNav {
  position: absolute;
  width: 100%;
  z-index: 1000;
}
</style>