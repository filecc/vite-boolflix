import { defineStore } from 'pinia';
import axios from 'axios';

export const useMovieList = defineStore('movie-list', {
    state: () => ({ 
        list: null, 
        loading: false,
        URL_IMG: 'https://image.tmdb.org/t/p/original',
    }),
    actions: {
        populate(item) {
          this.list = item;
        },
        loadingFalse() {
            this.loading = false;
        },
        loadingTrue(){
            this.loading = true;
        }
    }
})

export const useSeriesList = defineStore('series-list', {
    state: () => ({ 
        list: null, 
        loading: false,
        URL_IMG: 'https://image.tmdb.org/t/p/original',
    }),
    actions: {
        populate(item) {
          this.list = item;
        },
        loadingFalse() {
            this.loading = false;
        },
        loadingTrue(){
            this.loading = true;
        }
    }
})

export const useMovieToprated = defineStore('top-rated-movie', {
    state: () => ({ 
        list: null, 
        loading: false,
        URL_IMG: 'https://image.tmdb.org/t/p/original',
    }),
    actions: {
        populate(item) {
          this.list = item;
        },
        loadingFalse() {
            this.loading = false;
        },
        loadingTrue(){
            this.loading = true;
        }
    }
})

export const useMoviePerGenresList = defineStore('movie-per-genres', {
    state: () => ({
        list: []
    }), 
    actions: {
        getMoviesPerGenres(genres){
           genres.forEach(element => {
            const query =
            "https://api.themoviedb.org/3/discover/movie?api_key=d18b4066572abd6df624614e95914560&language=it-IT&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_date.gte=2021&vote_average.gte=3&with_genres=" +
            element.id;
            axios
            .get(query)
            .then((res) => {
              this.list.push({name: element.name, movies: res.data.results })
            })
            .catch(() => {
              console.log('error with id ' + element)
            });
           });
          

        }
    }
})

export const useGeneral = defineStore('general', {
    state: () => ({ 
        API_URL: 'https://api.themoviedb.org/3/', 
        API_KEY: '?api_key=d18b4066572abd6df624614e95914560',
        URL_IMG: 'https://image.tmdb.org/t/p/original',
        GOOGLE_PROXY_URL: 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=',
        IMG_PLACEHOLDER: '/images/img-placeholder.svg',
        IT: '&language=it-IT',
        loading: true,
        movieGenres: null,
        tvGenres: null,
    }),
    actions: {
        setLoadingTrue() {
            this.loading = true;
        },
        setLoadingFalse(){
            this.loading = false;
        },
        setMovieGenres(list){
            this.movieGenres = list;
        },
        setTvGenres(list){
            this.tvGenres = list
        }
    }
})