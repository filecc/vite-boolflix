<template>
    <div v-if="store.loading">
        <Loader />
    </div>
    <div v-else :style="'background-image:url(' + backdrop + ');'" class="py-4 mainDiv shadow">
        <h3 class="text-center text-white pt-5">{{ title }}</h3>
        <div class="py-2 px-1 px-md-4 rounded poster mx-auto m-md-0">
            <img class="img-fluid rounded" :src="url" :alt="title">
        </div>
        <div class="text-white py-2 px-1 px-md-4">
            {{ movieFound?.overview }}
        </div>
        <div class="text-white">
            {{ movieFound }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useMovieList, useSeriesList } from '../stores/list';
import Loader from '../src/components/Loader.vue'

const store = useSeriesList();

export default {
    components: {
        Loader,
    },
    data() {
        return {
            store,
            title: null,
            id: null,
            movieFound: null,
            BASE_URL: store.URL_IMG,
            url: null,
            backdrop: null
        }
    },
    methods: {
        loading() {
            this.store.loadingTrue();
        },
        loadingFalse() {
            this.store.loadingFalse();
        },
    },
    mounted() {
        this.loading();
        const split = this.$route.params.name.split('-');
        this.title = split[1];
        this.id = split[0];
        const query = 'https://api.themoviedb.org/3/tv/' + this.id + '?api_key=d18b4066572abd6df624614e95914560&language=it-IT';
        console.log(query)
        axios.get(query)
            .then(res => {
                this.movieFound = res.data;
                this.url = `${this.BASE_URL}${this.movieFound.poster_path}`;
                this.backdrop = `${this.BASE_URL}${this.movieFound.backdrop_path}`;
                this.loadingFalse();
            })

    }

}
</script>

<style lang="scss" scoped>
.mainDiv {
    background-repeat: no-repeat;
    background-size: cover;

    @media screen and (max-width: 768px) {
        background-position: top;
    }
}

.poster {
    max-width: 20rem;
}
</style>