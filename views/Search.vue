<template>
    <div class="pt-5 px-4 mainContainer" style="background-color: #202020;">
        <div class="flex-grow-1">
            <h5>Cerca</h5>
            <div class="d-flex justify-content-between align-items-center">
                <input @input="search" v-model="searchingQuery" class="input-group-text w-100 text-start" type="text"
                placeholder="Nome del film o serie TV">
                <button ref="buttonReset" @click="cancelSearch" class="btn btn-danger ms-3" disabled>Annulla</button>
            </div>
           
        </div>
        <template v-if="!loading">
            <SearchResult :result="movieResult" :loadingState="loading" type="movie" />
            <SearchResult :result="tvResult" :loadingState="loading" type="tv" />
        </template>

        <div class="text-center" v-else>
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import SearchResult from '../src/components/SearchResult.vue';

export default {
    data() {
        return {
            searchingQuery: null,
            movieResult: null,
            tvResult: null,
            loading: false,
        };
    },
    methods: {
        search() {
            if (this.searchingQuery.length > 0) {
                this.$refs['buttonReset'].disabled = false;
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
                this.$refs['buttonReset'].disabled = true;
                this.loading = false
                this.tvResult = null;
                this.movieResult = null;
            }
        },
        cancelSearch(){
            this.$refs['buttonReset'].disabled = true;
            this.loading = false
            this.tvResult = null;
            this.movieResult = null;
            this.searchingQuery = '';
        }
    },
    components: { SearchResult }
}
</script>

<style lang="scss" scoped>
@use '../src/assets/style/variables' as *;

* {
    color: white;
}

.mainContainer {
    min-height: calc(100dvh - 80px);
    max-width: 1200px;
    margin: 0 auto;
}

input {
    background-color: #202020;

    &:focus,
    &:focus-visible {
        outline: 1px solid $fg-primary;
    }

}
</style>