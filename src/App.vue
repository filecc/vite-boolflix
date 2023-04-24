<template>
  <div class="layoutNav d-flex justify-content-between align-items-center px-4 py-2">
    <router-link to="/">
      <Navbar @click="changeBackground" />
    </router-link>
    <router-link class="btn btn-outline-primary" to="/search">
      <i class="bi bi-search"></i>
    </router-link>
  </div>
  <div class="pt-5" v-if="GENERAL.loading">
    <Loader />
  </div>
  <div v-else>
    <router-view />
  </div>
<div class="layoutFooter">
  <AppFooter />
</div>
 
</template>

<script>
import Navbar from './components/Navbar.vue';
import axios from 'axios';
import { useMovieList, useSeriesList, useMovieToprated, useGeneral, useMoviePerGenresList } from '../stores/list';
import AppFooter from './components/AppFooter.vue';
import Loader from './components/Loader.vue';


export default {
  components: {
    Navbar,
    AppFooter,
    Loader
  },
  data() {
    return {
      GENERAL: useGeneral(),
    }
  },
  methods: {
    getInitialList() {
      let errors = false;

      const GENERAL = useGeneral();
      GENERAL.setLoadingTrue();

      const movies = useMovieList();
      axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d18b4066572abd6df624614e95914560&language=it-IT&page=1')
        .then(res => {
          movies.populate(res.data.results)
        }).catch(()=> {
          errors = true;
        });

      const series = useSeriesList();
      axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=d18b4066572abd6df624614e95914560&language=it-IT&page=1')
        .then(res => {
          series.populate(res.data.results)

        }).catch(()=> {
          errors = true;
        });

      const topRatedMovie = useMovieToprated();
      axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c60495b897d3871eb954459412ca5d5d&language=it-IT&page=1')
        .then(res => {
          topRatedMovie.populate(res.data.results)
        }).catch(()=> {
          errors = true;
        });
      
      
      axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=d18b4066572abd6df624614e95914560&language=it-IT').then(res => {
        const movieGenres = res.data.genres;
        GENERAL.setMovieGenres(movieGenres);
        
        const arrayOfGenres = [];
        movieGenres.forEach(element => {
          arrayOfGenres.push({id: element.id, name: element.name});
        });
        const moviePerGenres = useMoviePerGenresList();
        moviePerGenres.getMoviesPerGenres(arrayOfGenres)
      })

      axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=d18b4066572abd6df624614e95914560&language=it-IT').then(res => {
        const tvGenres = res.data.genres;
       
        GENERAL.setTvGenres(tvGenres);
      });

      

        if (!errors) {
          setTimeout(() => {
          GENERAL.setLoadingFalse();
        }, 300);
        } else {
          window.location.href = '/404'
        }
        
       
        
    },
    changeBackground(){
      document.querySelector('body').style.background = '#202020';
      this.GENERAL.setSearchingModeFalse();
    }
  },
  mounted() {
    this.getInitialList();
  }
}

</script>

<style lang="scss" scoped>
.layoutNav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

</style>