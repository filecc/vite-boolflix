<template>
    <div class="p-2">
        <h2>Most Popular Movies</h2>
        <div @wheel="scroll" id="containerMoviesPopular">
            <router-link v-for="movie in movies.list" :to="'/movie/'+ movie.id + '-' + movie.original_title">
            <SingleMovieCard :item="movie" :image="movie.poster_path" />
                 </router-link>
        </div>
       
        <router-link class="btn btn-primary" to="/series/generic">TV Show Generic</router-link>
    </div>
</template>

<script>
    import SingleMovieCard from '../src/components/SingleMovieCard.vue';
    import { useMovieList } from '../stores/list';
    const movies = useMovieList();
    export default{
    data() {
        return {
            movies,
        };
    },
    methods :{
        scroll(){
            console.log('scrolliiiing')
        }
    },
    components: { SingleMovieCard }
}
</script>

<style lang="scss" scoped>
#containerMoviesPopular{
    padding: 1rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
}
</style>