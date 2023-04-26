<template>
    <div :class="GENERAL.searchingMode && 'timeToSearch'" class="mainContainer p-4 hero">

        <div class="row row-cols-1 row-cols-md-2 gx-0 px-4 align-items-center justify-content-center h-100 mt-5">
            <div class="col">
                <h1>Tutte l'informazioni sull&apos;<span>intrattenimento</span> che stavi cercando.</h1>
            </div>
           
            <div class="col d-flex align-items-center">
                <div class="inputHolder">
                    <input  @input="startSearch" v-model="searchQuery" @focusin="startSearch" @focusout="finishSearch"
                class="input-group-text bg-dark text-start text-white border-0" type="text" placeholder="Cerca un film o una serie TV">
                    <div v-if="GENERAL.searchingMode" class="d-flex justify-content-end align-items-center resetButton">
                        <button @click="resetSearch" class="btn btn-outline-danger btn-sm">Annulla</button>
                    </div>
                </div>
               
            </div>
            
        </div>

        
    </div>
    <Transition>
            <div class="pt-5 px-4" v-if="GENERAL.searchingMode">
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
                this.searchQuery = null;
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
        },
        resetSearch(){
            this.tvResult = null;
            this.movieResult = null;
            this.searchQuery = '';
            this.GENERAL.setSearchingModeFalse();
        }
    },
    components: { SearchResult }
}
</script>

<style lang="scss" scoped>
@use '../src/assets/style/variables' as *;

.mainContainer {
    height: 50vh;
    transition: all 0.3s linear;
}
.hero{
    background: url('../../images/bg-hero.svg');
    background-size: cover;
    background-repeat: no-repeat;
}
h1{
    font-size: 30px;
    
    @media screen and (min-width: 1100px) {
        font-size: 60px;
    }

    span{
    color: white;
    background: -webkit-linear-gradient(to right, $fg-primary, #eee, $fg-primary);
    background: linear-gradient(to right, $fg-primary, #eee, $fg-primary);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    }
    
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
    @media screen and (min-width: 1100px) {
       max-width: 350px;
    }
   

}

.inputHolder{
    position: relative;
    width: 100%;

    @media screen and (min-width: 1100px) {
        display: flex;
        justify-content: end;
    }
}

.resetButton{
    position: absolute;
    top: 50%;
    right: 0;
    padding: 0;
    margin: 0;
    transform: translate3d(0, -50%, 0);
    margin-right: 5px;
}
</style>