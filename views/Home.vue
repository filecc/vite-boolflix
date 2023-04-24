<template>
    <div v-if="GENERAL.loading">
        <Loader />
    </div>
    <div v-else class="p-4 mainContainer">
        <AppHero ref="hero" />
        <template v-if="!GENERAL.searchingMode">
            <h2 class="pt-5">Film Popolari</h2>
            <div @whee.stop="e => scroll(e, 'movie_container')" ref="movie_container" class="containerPopular">
                <router-link @wheel.stop="e => scroll(e, 'movie_container')" v-for="movie in movies.list"
                    :to="'/movie/' + movie.id + '-' + movie.title.split('.')[0]">
                    <SingleMovieCard :item="movie" :image="movie.poster_path" />
                </router-link>
            </div>
            <h2 class="pt-5">Serie Tv Popolari</h2>

            <div @wheel.stop="e => scroll(e, 'series_container')" ref="series_container" class="containerPopular">
                <router-link @wheel.stop="e => scroll(e, 'series_container')" v-for="serie in series.list"
                    :to="'/series/' + serie.id + '-' + serie.name.split('.')[0]">
                    <SingleMovieCard :item="serie" :image="serie.poster_path" />
                </router-link>
            </div>

            <h2 class="pt-5">Film Più Votati in Italia</h2>
            <div @wheel.stop="e => scroll(e, 'topRated_container')" ref="topRated_container" class="containerPopular">
                <router-link @wheel.stop="e => scroll(e, 'topRated_container')" v-for="movie in topRated.list"
                    :to="'/movie/' + movie.id + '-' + movie.title.split('.')[0]">
                    <SingleMovieCard :item="movie" :image="movie.poster_path" />
                </router-link>
            </div>

            <div v-for="item in arrayOfMoviesPerGenres">
                <h2 class="pt-5"> Ultime uscite in {{ item.name }}</h2>
                <div :id="item.name.split(' ')[0]" @wheel.stop="e => scroll(e, item.name.split(' ')[0], true)" ref="boxes"
                    class="containerPopular">
                    <router-link @wheel.stop="e => scroll(e, item.name.split(' ')[0], true)" v-for="movie in item.movies"
                        :to="'/movie/' + movie.id + '-' + movie.title.split('.')[0]">
                        <SingleMovieCard :item="movie" :image="movie.poster_path" />
                    </router-link>
                </div>
            </div>
        </template>



    </div>
</template>

<script>
import AppHero from '../src/components/AppHero.vue';
import Loader from '../src/components/Loader.vue';
import SingleMovieCard from '../src/components/SingleMovieCard.vue';
import { useMovieList, useSeriesList, useMovieToprated, useGeneral, useMoviePerGenresList } from '../stores/list';
const movies = useMovieList();
const series = useSeriesList();
const topRated = useMovieToprated();
const moviesPerGenres = useMoviePerGenresList();

export default {
    data() {
        return {
            movies,
            series,
            topRated,
            GENERAL: useGeneral(),
            arrayOfMoviesPerGenres: moviesPerGenres.list,

        };
    },
    methods: {
        scroll(e, ref, vfor) {
            /* PREVENT TRACKPAD TO TRIGGER EVENT MORE THAN ONCE */
            if (Math.abs(e.deltaY) < 4) return
            let box;
            if (vfor) {
                this.$refs['boxes'].forEach(element => {

                    if (element.getAttribute('id') === ref) {
                        box = element;
                    }
                });
            } else {
                box = this.$refs[ref];
            }

            box.scrollBy({
                left: e.deltaY < 0 ? -240 : 240,
            });
        },
    },
    components: { SingleMovieCard, Loader, AppHero }
}
</script>

<style lang="scss" scoped>
* {
    color: white;
}

.mainContainer {
    min-height: calc(100dvh - 80px);
    max-width: 1200px;
    margin: 0 auto;
}

.containerPopular {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */

    &::-webkit-scrollbar {
        display: none;
    }


}
</style>