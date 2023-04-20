<template>
    <div v-if="store.loading">
        <Loader />
    </div>

    <div v-else class="mainDiv" :style="bgColor">
        <div class="backdrop pt-5 pb-4" :style="'background-image: url(' + backdrop + ');'">
            <div class="py-2 px-1 px-md-4 rounded poster mx-auto m-md-0">
                <img class="img-fluid rounded" :src="url" :alt="title">
            </div>
        </div>
        <div class="info py-2 px-3 px-md-4 d-md-flex" :style="textColor">

            <div class="text-center text-white text-md-start col-12 col-md-5">
                <h3 class="text-center text-md-start text-white fw-bold pt-4">{{ title }}</h3>
                <span>{{ movieFound?.original_title }}</span>
                <div class="stats">
                    <span class="badge rounded-pill text-bg-info my-1">Voto Medio: {{ movieFound?.vote_average.toFixed(1)
                    }}</span>

                </div>
                <div class="pb-4 stats">
                    <span>{{ movieFound?.release_date.split('-')[0] }}</span> -
                    <span>{{ movieFound?.original_language.toUpperCase() }}</span>
                </div>
            </div>
            <div class="col-12 col-md-7 pt-4">
                <small>
                    {{ movieFound?.overview }}
                </small>


            </div>

        </div>
        <div class="d-md-flex px-4">
            <div class="col-12 col-md-5 text-center">
                <h6 class="text-center text-md-start fw-bold text-white pt-3">
                    Cast

                </h6>
                <span class="badge rounded-pill text-bg-primary d-inline-block showall" @click="() => showCast = true">
                    Mostra tutto
                </span>
                <div>
                    <CastPreview :actors="cast" />
                </div>
            </div>

            <!-- TRAILER -->
            <div class="col-12 col-md-7 d-flex flex-column justify-content-between" v-if="videoKey">
                <h6 class="text-center text-md-start fw-bold text-white py-3">Trailer</h6>
                <iframe width="100%" height="300px" :src="'https://www.youtube.com/embed/' + videoKey" frameborder="0"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    <div v-if="similar">

        <h6 class="pt-5 text-white px-4">Simili a {{ title }}</h6>
            <div ref="similar" @wheel.stop="e => scroll(e, 'similar', 'counter')" class="containerPopular">
                <router-link v-for="movie in similar" :to="'/movie/' + movie.id + '-' + movie.title">
                <SingleMovieCard :item="movie" :image="movie.poster_path" />
                     </router-link>
            </div>

    </div>
    </div>
    <!-- CAST MODAL -->
    <Transition>
    <div v-if="showCast" class="castShow shadow" :style="bgColor">
        <div :style="textColor">
            <div class="text-end">
                <button @click="() => showCast = false" :style="textColor" class="btn"><i class="bi bi-x-lg"></i></button>
            </div>
            <h6 class="text-center">{{ title }} - Cast</h6>
            <div class="row row-cols-2 row-cols-md-4 row-cols-lg-6 gx-0">
                <ActorsProfile :actors="cast" />
            </div>

        </div>
    </div>
</Transition>
</template>

<script>
import axios from 'axios';
import { useMovieList } from '../stores/list';
import Loader from '../src/components/Loader.vue'
import ColorThief from 'colorthief/dist/color-thief.mjs'
import ActorsProfile from '../src/components/ActorsProfile.vue';
import CastPreview from '../src/components/CastPreview.vue';
import SingleMovieCard from '../src/components/SingleMovieCard.vue';

const store = useMovieList();
const colorThief = new ColorThief();

export default {
    components: {
    Loader,
    ActorsProfile,
    CastPreview,
    SingleMovieCard
},
    data() {
        return {
            store,
            title: null,
            id: null,
            movieFound: null,
            BASE_URL: store.URL_IMG,
            url: null,
            backdrop: null,
            bgColor: null,
            textColor: null,
            cast: null,
            showCast: false,
            videoKey: null,
            counter: 0,
            similar: null,
        }
    },
    methods: {
        loading() {
            this.store.loadingTrue();
        },
        loadingFalse() {
            this.store.loadingFalse();
        },
        getCastInfo(id) {
            const query = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c60495b897d3871eb954459412ca5d5d&language=it-IT`;
            axios.get(query).then(res => { this.cast = res.data.cast });
        },
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
        created() {
        this.$watch(
        () => this.$route.params,
        (toParams) => {
            
           window.location.href = toParams.name;
        }
        )
    },
    mounted() {
        this.loading();
        const split = this.$route.params.name.split('-');
        this.title = split[1];
        this.id = split[0];
        const query = 'https://api.themoviedb.org/3/movie/' + this.id + '?api_key=d18b4066572abd6df624614e95914560&language=it-IT';

        axios.get(query)
            .then(res => {
                this.movieFound = res.data;
                !this.movieFound.poster_path 
                ? this.url = '/images/img-placeholder.svg'
                : this.url = `${this.BASE_URL}${this.movieFound.poster_path}`;
                this.backdrop = `${this.BASE_URL}${this.movieFound.backdrop_path}`;
                this.loadingFalse();

                const img = new Image();
                let imageURL = this.backdrop;
                let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
                img.crossOrigin = 'Anonymous';
                img.src = googleProxyURL + encodeURIComponent(imageURL);
                setTimeout(() => {
                    try {
                        const r = colorThief.getColor(img)[0];
                        const g = colorThief.getColor(img)[1];
                        const a = colorThief.getColor(img)[2];

                        this.bgColor = `background: linear-gradient(rgb(${r}, ${g}, ${a}) 80%, rgb(${r + 50}, ${g + 50}, ${a + 50}))`;
                        this.textColor = `color: rgb(${r + 100}, ${g + 150}, ${a + 200})`;
                        console.log(this.bgColor)
                        console.log('text ' + this.textColor)
                    } catch (error) {
                        this.bgColor = `background: linear-gradient(black, black)`;
                        this.textColor = 'color: white'
                    }

                }, 500)
            });
        const videoQuery = `https://api.themoviedb.org/3/movie/${split[0]}/videos?api_key=c60495b897d3871eb954459412ca5d5d&language=it-IT`
        axios.get(videoQuery).then(res => {
            console.log(res.data)
            this.videoKey = res.data?.results[0]?.key
            if (res.data.results.length === 0) {
                axios.get(`https://api.themoviedb.org/3/movie/${split[0]}/videos?api_key=c60495b897d3871eb954459412ca5d5d&language=en-US`).
                    then(res => {
                        this.videoKey = res.data?.results[0]?.key
                    })

            }

        })
        axios.get(`https://api.themoviedb.org/3/movie/${split[0]}/recommendations?api_key=c60495b897d3871eb954459412ca5d5d&language=en-US&page=1`)
        .then(res => {
            if (res.data.results.length > 0){
                this.similar = res.data.results;
            }
            
            console.log(this.similar)
        })
        this.getCastInfo(split[0]);


    }

}
</script>

<style lang="scss" scoped>
@use '../src/assets/style/variables' as *;

.mainDiv {
    min-height: 100dvh;
    padding-bottom: 3rem;
}

.backdrop {
    background-size: cover;
    background-position: top;
}

.info {

    color: white;
}

.poster {
    max-width: 20rem;

}

.cast {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

}

.castShow {
    padding: 2rem;
    margin: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: auto;
    border-radius: 5px;
    z-index: 1000;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }

    &::scrollbar {
        display: none;
    }

}

.showall {
    cursor: pointer;
}

.stats {
    font-size: 12px;
}

.containerPopular{
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    overscroll-behavior: contain;
}
</style>