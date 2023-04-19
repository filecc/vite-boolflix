<template>
    <div :style="'background-image:url('+backdrop+');'" class="py-4 mainDiv">
        <h3 class="text-center text-white">{{ title }}</h3>
        <div class="py-2 px-1 px-md-4 rounded poster mx-auto m-md-0">
            <img class="img-fluid rounded" :src="url" :alt="title">
        </div>
        {{ movieFound }}
    </div>
</template>

<script>
import axios from 'axios';
import { useMovieList } from '../stores/list';
const store = useMovieList();

    export default {
        data(){
            return {
                title: null,
                id: null,
                movieFound: null,
                BASE_URL: store.URL_IMG,
                url: null,
                backdrop: null
            }
        },
        mounted(){
            const split = this.$route.params.name.split('-');
            this.title = split[1];
            this.id = split[0];
            const query = 'https://api.themoviedb.org/3/movie/' + this.id + '?api_key=d18b4066572abd6df624614e95914560';
            console.log(query)
            axios.get(query)
            .then(res => {
                this.movieFound = (res.data);
                this.url = `${this.BASE_URL}${this.movieFound.poster_path}`;
                this.backdrop = `${this.BASE_URL}${this.movieFound.backdrop_path}`;
      })

        }
        
    }
</script>

<style lang="scss" scoped>
    .mainDiv{
        background-repeat: no-repeat;
        background-size: cover;
        @media screen and (max-width: 768px) {
            background-position: top;
        }
    }
    .poster{
        max-width: 20rem;
    }
</style>