<template>
    <div class="p-2 mainContainer">
        <h2 class="pt-5">Film Popolari</h2>
        <div ref="movie_container" @wheel.stop="e => scroll(e, 'movie_container', 'counter1')" class="containerPopular">
            <router-link v-for="movie in movies.list" :to="'/movie/'+ movie.id + '-' + movie.title">
            <SingleMovieCard :item="movie" :image="movie.poster_path" />
                 </router-link>
        </div>
        <h2 class="pt-5">Serie Tv Popolari</h2>
        <div ref="series_container" @wheel.stop="e => scroll(e, 'series_container', 'counter2')" class="containerPopular">
            <router-link v-for="serie in series.list" :to="'/series/'+ serie.id + '-' + serie.name">
            <SingleMovieCard :item="serie" :image="serie.poster_path" />
                 </router-link>
        </div>
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
            series,
            counter1: 0,
            counter2: 0
        };
    },
    methods :{
       
        scroll(e, ref, counter){
            let delta =  e.deltaY;   
            let box = this.$refs[ref];    
            
            const divScrollable = box.scrollWidth;
 
            if (this[counter]=== 0){
                this[counter] = 0;
                delta < 0 ? (this[counter] -= 0) : (this[counter] += 100);
                box.scrollTo(this[counter], 0);
            } else if (this[counter] >= divScrollable) {
                delta < 0 ? (this[counter] -= 100) : (this[counter] += 0);
                box.scrollTo(this[counter], 0);
            } else {
                delta < 0 ? (this[counter] -= 100) : (this[counter] += 100);
                box.scrollTo(this[counter], 0);
            }
        }
    },
    components: { SingleMovieCard }
}
</script>

<style lang="scss" scoped>
.containerPopular{
    padding: 1rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
}

</style>