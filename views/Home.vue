<template>
    <div class="p-2">
        <h2>Most Popular Movies</h2>
        <div @wheel="scroll" id="containerMoviesPopular">
        <SingleMovieCard v-for="movie in store.list" :item="movie" :image="movie.poster_path" />
        </div>
        <router-link class="btn btn-primary" to="/movie/generic">Movie Generic</router-link>
        <router-link class="btn btn-primary" to="/series/generic">TV Show Generic</router-link>
    </div>
</template>

<script>
    import SingleMovieCard from '../src/components/SingleMovieCard.vue';
import { useHomeList } from '../stores/list';
    const store = useHomeList();
    export default{
    data() {
        return {
            store,
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