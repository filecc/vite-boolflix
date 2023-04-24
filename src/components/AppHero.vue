<template>
    <div :class="GENERAL.searchingMode && 'timeToSearch'" class="mainContainer p-4 hero">

        <div class="row gx-0">
            
            <h1 class="col-12 col-md-7 p-0 m-0 pe-3">Tutte l'informazioni sull'intrattenimento che stavi cercando.</h1>
            <div class="col-12 col-md-5 d-flex align-items-center">
                <input  @input="startSearch" v-model="searchQuery" @focusin="startSearch" @focusout="finishSearch"
                class="input-group-text text-start mt-5 mt-md-0" type="text" placeholder="Cerca...">
            </div>
            
        </div>

        
    </div>
    <Transition>
            <div class="pt-5" v-if="GENERAL.searchingMode">
                <SearchResult type="movie" :result="movieResult" :loadingState="loading" />
                <SearchResult type="tv" :result="tvResult" :loadingState="loading" />
            </div>
        </Transition>
</template>

<script>
import { useGeneral } from '../../stores/list';
import axios from 'axios';
import SearchResult from './SearchResult.vue';
const GENERAL = useGeneral();

export default {
    data() {
        return {
            searching: false,
            searchQuery: null,
            GENERAL,
            loading: false,
            movieResult: null,
            tvResult: null
        };
    },
    methods: {
        startSearch() {
            GENERAL.setSearchingModeTrue();
            if (this.searchQuery === null || this.searchQuery === "") {
                GENERAL.setSearchingModeFalse();
                this.movieResult = null; 
                this.tvResult = null;
            }
            else {
                this.search();
            }
        },
        search() {
            if (this.searchQuery.length > 0) {
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c60495b897d3871eb954459412ca5d5d&language=it&query=${this.searchQuery}`).then(res => {
                    this.movieResult = res.data.results;
                });
                axios.get(`https://api.themoviedb.org/3/search/tv?api_key=c60495b897d3871eb954459412ca5d5d&language=it&query=${this.searchQuery}`).then(res => {
                    this.tvResult = res.data.results;
                });
            }
            if (this.searchQuery.length <= 0) {
                this.tvResult = null;
                this.movieResult = null;
            }
        }
    },
    components: { SearchResult }
}
</script>

<style lang="scss" scoped>
@use '../src/assets/style/variables' as *;

.mainContainer {
    height: 50vh;
    display: grid;
    place-items: center;
    transition: all 0.3s linear;
}
.hero{
    background: url('../../public/images/bg-hero.svg');
    background-size: cover;
    background-repeat: no-repeat;
}
h1{
    font-size: 30px;
}

.timeToSearch {
        height: 30vh;
    }

input {
    position: relative;
    width: 100%;
    border-bottom: 1px solid $fg-primary;

    &:focus,
    &:focus-visible {
        outline: 1px solid $fg-primary;
    }

    .timeToSearch {
        width: 100% !important;
    }

}
</style>