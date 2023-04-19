<template>
    <div class="p-2 mainContainer">
        <h2 class="pt-5">Film Popolari</h2>
        <div ref="scroll_container" @wheel.self="scroll" id="containerMoviesPopular">
            <router-link v-for="movie in movies.list" :to="'/movie/'+ movie.id + '-' + movie.title">
            <SingleMovieCard :item="movie" :image="movie.poster_path" />
                 </router-link>
        </div>
        <h2 class="pt-5">Serie Tv Popolari</h2>
        <div @wheel.self="scroll" id="containerMoviesPopular">
            <router-link v-for="serie in series.list" :to="'/series/'+ serie.id + '-' + serie.name">
            <SingleMovieCard :item="serie" :image="serie.poster_path" />
                 </router-link>
        </div>
        <router-link class="btn btn-primary" to="/series/generic">TV Show Generic</router-link>
    </div>
</template>

<script>
    import SingleMovieCard from '../src/components/SingleMovieCard.vue';
    import { useMovieList, useSeriesList } from '../stores/list';
    const movies = useMovieList();
    const series = useSeriesList();

    export default{
    data() {
        return {
            movies,
            series
        };
    },
    methods :{
        scroll(e){
            this.$refs['scroll_container'].scrollLeft += e.deltaY;
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
.mainContainer{
    min-height: 100dvh;
   
}
</style>