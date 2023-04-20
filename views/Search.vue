<template>
    <div class="pt-5 px-4 mainContainer">
        <div class="flex-grow-1">
            <h5>Cerca</h5>
            <input @input="search" v-model="searchingQuery" class="input-group-text w-100 text-start mb-3" type="text"
                placeholder="Nome del film">
        </div>

        <h5 v-if="movieResult">Film per la tua ricerca</h5>
        <div v-if="movieResult && !loading" class="containerResults row row-cols-2 row-cols-md-4 row-cols-lg-5">
            <div v-for="movie in movieResult" class="col p-2">
                <router-link :to="'/movie/' + movie.id + '-' + movie.title">
                    
                    <div class="card">
                        <img class="img-card-top rounded img-fluid" :src="movie.poster_path ?`${this.BASE_URL}${movie.poster_path}` : 'images/img-placeholder.svg'" :alt="movie.title">          
                     </div>
                </router-link>
            </div>
        </div>
        <h5 v-if="tvResult">Serie per la tua ricerca</h5>
        <div v-if="tvResult && !loading" class="containerResults row row-cols-2 row-cols-md-4 row-cols-lg-5">
            <div v-for="serie in tvResult" class="col p-2">
                <router-link :to="'/series/' + serie.id + '-' + serie.name">
                    <div class="card">
                        <img class="img-card-top rounded img-fluid" :src="serie.poster_path ?`${this.BASE_URL}${serie.poster_path}` : 'images/img-placeholder.svg'" :alt="serie.title">          
                     </div>
                </router-link>
            </div>
        </div>
        <div class="text-center" v-else-if="!movieResult && loading">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import SingleMovieCard from '../src/components/SingleMovieCard.vue';
import Loader from '../src/components/Loader.vue';

export default {
    data() {
        return {
            searchingQuery: null,
            movieResult: null,
            tvResult: null,
            loading: false,
            url_img: null,
            BASE_URL: 'https://image.tmdb.org/t/p/original',
        };
    },
    methods: {
        search() {
            console.log(this.searchingQuery);
            if (this.searchingQuery.length > 0) {
                this.loading = true;
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c60495b897d3871eb954459412ca5d5d&language=it&query=${this.searchingQuery}`).then(res => {
                    this.movieResult = res.data.results;
                    this.loading = false;
                })
                axios.get(`https://api.themoviedb.org/3/search/tv?api_key=c60495b897d3871eb954459412ca5d5d&language=it&query=${this.searchingQuery}`).then(res => {
                    this.tvResult = res.data.results;
                    this.loading = false;
                })
            }
            if (this.searchingQuery.length <= 0) {
                this.loading = false
                this.tvResult = null;
                this.movieResult = null;
            }
        }
    },
    components: { SingleMovieCard, Loader }
}
</script>

<style lang="scss" scoped>
@use '../src/assets/style/variables' as *;

* {
    color: white;
}

.mainContainer {
    min-height: calc(100dvh - 80px);
}

input {
    background-color: #202020;

    &:focus,
    &:focus-visible {
        outline: 1px solid $fg-primary;
    }

}


</style>