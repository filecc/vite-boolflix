<template>
    <div v-if="loading">
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
                <span>{{ itemFound?.original_title }}</span>
                <div class="stats">
                    <span class="badge rounded-pill text-bg-info my-1">
                        <span v-for="star in vote">
                            <i :class="'bi bi-star'+star"></i>
                        </span>
                </span>

                </div>
                <div class="pb-4 stats">
                    <span v-if="isMovie">{{ itemFound?.release_date?.split('-')[0] }}</span> 
                    <span v-if="isTv">{{ itemFound?.first_air_date?.split('-')[0] }}</span>
                    -
                    <img style="width:20px" :src="'/images/flags/language-'+itemFound?.original_language+'.svg'" :alt="itemFound?.original_language">
                </div>
            </div>
            <div class="col-12 col-md-7 pt-4">
                <small>
                    {{ itemFound?.overview }}
                </small>


            </div>

        </div>
        <div class="d-md-flex px-4">
            <div class="col-12 col-md-5 text-center">
                <h6 class="text-center text-md-start fw-bold text-white pt-3">
                    Cast
                    <span class="ms-2 badge rounded-pill text-bg-primary d-inline-block showall" @click="() => showCast = true">
                    Mostra tutto
                </span>
                </h6>
                
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
    <div v-if="similar && isMovie">

        <h6 class="pt-5 text-white px-4">Simili a {{ title }}</h6>
            <div ref="similar" @wheel.self="e => scroll(e, 'similar', 'counter')" class="containerList">
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
import Loader from '../src/components/Loader.vue'
import ColorThief from 'colorthief/dist/color-thief.mjs'
import ActorsProfile from '../src/components/ActorsProfile.vue';
import CastPreview from '../src/components/CastPreview.vue';
import SingleMovieCard from '../src/components/SingleMovieCard.vue';
import {useGeneral} from '../stores/list';

const {
    API_URL, 
    API_KEY, 
    URL_IMG,
    GOOGLE_PROXY_URL,
    IT
} = useGeneral();

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
            loading:  null,
            isMovie: false,
            isTv: false,
            dbToSearch: null,
            title: null,
            id: null,
            itemFound: null,
            url: null,
            backdrop: null,
            bgColor: null,
            textColor: null,
            cast: null,
            showCast: false,
            videoKey: null,
            counter: 0,
            similar: null,
            vote: [],
        }
    },
    methods: {
        getCastInfo() {
            const query = API_URL + this.dbToSearch + this.id + '/credits' + API_KEY + IT;
            console.log(query)
            axios.get(query).then(res => { this.cast = res.data.cast });
        },
        getBackdropColor() {
            const img = new Image();
            let imageURL = this.backdrop;
            img.crossOrigin = 'Anonymous';
            img.src = GOOGLE_PROXY_URL + encodeURIComponent(imageURL);
            setTimeout(() => {
                try {
                    const r = colorThief.getColor(img)[0];
                    const g = colorThief.getColor(img)[1];
                    const a = colorThief.getColor(img)[2];

                    this.bgColor = `background: linear-gradient(rgb(${r}, ${g}, ${a}) 80%, rgb(${r + 50}, ${g + 50}, ${a + 50}))`;
                    this.textColor = `color: rgb(${r + 100}, ${g + 150}, ${a + 200})`;
                    this.loading = false;
                } catch (error) {
                    this.bgColor = `background: linear-gradient(black, black)`;
                    this.textColor = 'color: white'
                }

                this.loading = false;
            }, 500)
        },
        getVideos() {
            const videoQueryIT = API_URL + this.dbToSearch + this.id + '/videos' + API_KEY + IT;
            axios.get(videoQueryIT).then(res => {
                this.videoKey = res.data?.results[0]?.key
                if (res.data.results.length === 0) {
                    axios.get(API_URL + this.dbToSearch + this.id + '/videos' + API_KEY + '&language=en-US').
                        then(res => {
                            this.videoKey = res.data?.results[0]?.key
                        })
                }

            })
        },
        getSimilar() {
            const similarQuery = API_URL + this.dbToSearch + this.id + '/recommendations' + API_KEY + '&language=en-US&page=1';
            axios.get(similarQuery)
                .then(res => {
                    if (res.data.results.length > 0) {
                        this.similar = res.data.results;
                    }
                })
        },
        onLoadPage() {
            this.getVote();
            this.getCastInfo();
            this.getVideos();
            this.getSimilar();
            /* ALWAYS LAST METHOD TO CALL */
            this.getBackdropColor();
        },
        scroll(e, ref, counter) {
            let delta = e.deltaY;
            let box = this.$refs[ref];

            const divScrollable = box.scrollWidth;

            if (this[counter] === 0) {
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
        },
        getVote() {
            const average = Math.round(parseInt(this.itemFound.vote_average) / 2);
            while (this.vote.length < 5) {
                for (let i = 0; i < average; i++) {
                    this.vote.push('-fill');
                }
                for (let i = this.vote.length; i < 5; i++) {
                    this.vote.push(' ');
                }

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
        this.loading = true;

        const split = this.$route.params.name.split('-');
        this.title = split[1];
        this.id = split[0];
        const movieOrTv = this.$route.path.split('/')[1];
        if (movieOrTv === 'movie') {
            this.isMovie = true;
            this.isTv = false;
            this.dbToSearch = 'movie/'
        } else {
            this.isTv = true
            this.isMovie = false;
            this.dbToSearch = 'tv/'
        }

        const query = API_URL + this.dbToSearch + this.id + API_KEY + IT;

        axios.get(query)
            .then(res => {
                this.itemFound = res.data;
                !this.itemFound.poster_path
                    ? this.url = IMG_PLACEHOLDER
                    : this.url = `${URL_IMG}${this.itemFound.poster_path}`;
                this.backdrop = `${URL_IMG}${this.itemFound.backdrop_path}`;

                this.onLoadPage();
            }).catch(() => {
                 window.location.href = '/404'
            });
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

.containerList{
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