<template>
    <div v-if="loading">
        <Loader />
    </div>

    <Transition v-else>
        <div class="mainDiv" :style="bgColor">
            <div class="backdrop pt-5 pb-4" :style="'background-image: url(' + backdrop + ');'">
                <div class="py-2 px-1 px-md-4 rounded poster mx-auto m-md-0">
                    <img class="img-fluid rounded" :src="url" :alt="title">
                </div>
            </div>
            <div class="bodyDiv">
            <div class="info py-2 px-3 px-md-4 d-md-flex" :style="textColor">

                <div class="text-center text-md-start col-12 col-md-5">
                    <h3 class="text-center text-md-start fw-bold pt-4">{{ title }}</h3>
                    <span>{{ itemFound?.original_title }}</span>
                    <div class="stats">
                        <span class="badge rounded-pill text-bg-info my-1">
                            <span v-for="star in vote">
                                <i :class="'bi bi-star' + star"></i>
                            </span>
                        </span>
                    </div>
                    <div class="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center gap-1 my-2">
                        <span class="badge rounded-pill text-bg-secondary my-1" v-for="genre in itemFound?.genres">
                                {{ genre.name }}
                        </span>
                    </div>
                    <div class="pb-4 stats">
                        <span v-if="isMovie">{{ itemFound?.release_date?.split('-')[0] }}</span>
                        <span v-if="isTv">{{ itemFound?.first_air_date?.split('-')[0] }}</span>
                        - Lingua originale 
                        <img style="width:20px" :src="'/images/flags/language-' + itemFound?.original_language + '.svg'"
                            :alt="itemFound?.original_language">
                    </div>
                    <div v-if="providers" class="text-start">
                        <Providers :providers="providers" :title="title" />
                    </div>
                </div>
                <div class="col-12 col-md-7 pt-4">
                    <small>
                        {{ itemFound?.overview }}
                    </small>


                </div>

            </div>
            <div class="d-md-flex px-4" :style="textColor">
                <div class="col-12 col-md-5 text-center">
                    <h6 class="text-center text-md-start fw-bold pt-3">
                        Cast
                        <span class="ms-2 badge rounded-pill text-bg-primary d-inline-block showall"
                            @click="() => showCast = true">
                            Mostra tutto
                        </span>
                    </h6>

                    <div>
                        <CastPreview :actors="cast" />
                    </div>
                </div>

                <!-- TRAILER -->
                <div class="col-12 col-md-7 d-flex flex-column" v-if="videoKey">
                    <h6 class="text-center text-md-start fw-bold py-3">Trailer</h6>
                    <iframe width="100%" height="300px" :src="'https://www.youtube.com/embed/' + videoKey" frameborder="0"
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
            <div v-if="itemFound && episodesDetails" class="row py-3 px-4 text-center gx-0" :style="textColor">
               
                        <div class="col-12 col-md-5">
                            <h6 class="fw-bold text-start ">Stagioni</h6>
                            <div class="row row-cols-4 row-cols-md-1 gx-0">
                                <template v-for="item in itemFound.seasons">
                                    <div v-if="item.season_number != 0"  class="col pb-1 px-2 w-md-100">
                                        <button  :class="(item.season_number === seasonSelected) && 'disabled'" @click="getSeasonData(itemFound.id, item.season_number)"  class="btn btn-primary w-100 fw-bold fs-2">{{ item.season_number }}</button>
                                    </div>
                                </template>
                            </div>
                                
                        </div>
                
                        <div class="col-12 col-md-7">
                                <p class="pt-2 p-md-0" v-if="episodesDetails.episodes.length > 0">Espisodi: {{ episodesDetails.episodes.length }}</p>
                                <p v-else>Nessun episodio disponibile</p>

                                <div class="accordion">
                                  <div v-for="episode in episodesDetails.episodes" class="accordion-item mb-2 bg-dark text-white">
                                    <h2 v-if="episode.name" class="accordion-header">
                                      <button @click="() => episodeSelectedID = episode.id" :class="(episodeSelectedID != episode.id) && 'collapsed bg-primary-subtle'"  class="accordion-button bg-dark text-primary" type="button" > <!-- collapsed -->
                                         S{{seasonSelected}}E<span class="fw-bold">{{ episode.episode_number}}</span>: <span class="fw-bold ms-1">{{ episode.name }}</span>
                                      </button>
                                    </h2>
                                    <div :class="(episodeSelectedID === episode.id) && 'show'" v-if="episode.overview" class="accordion-collapse collapse" > <!-- collapse -->
                                      <div class="accordion-body">
                                       <p>{{ episode.overview }}</p>
                                      </div>
                                    </div>
                                    <div v-else :class="(episodeSelectedID === episode.id) && 'show'" class="accordion-collapse collapse" > <!-- collapse -->
                                      <div class="accordion-body">
                                       <p>Nessuna informazione.</p>
                                      </div>
                                    </div>
                                  </div>      
                                </div>
                        </div>
                </div>

            <!-- SIMILAR MOVIE/TV SHOWS -->
            <div v-if="similar" :style="textColor">
                <h6 class="pt-5 px-4">Simili a {{ title }}</h6>
                <div ref="similar" @wheel.stop="e => scroll(e, 'similar', false)" class="containerList">
                    <router-link @wheel.stop="e => scroll(e, 'similar', false)" v-for="item in similar"
                        :to="'/' + dbToSearch + item.id + '-' + (isMovie ? item.title : item.name)">
                        <SingleMovieCard :item="item" :image="item.poster_path" quality="low" />
                    </router-link>
                </div>

            </div>
        </div>
        </div>
    </Transition>
    <!-- CAST MODAL -->
    <Transition>
        <div v-if="showCast" class="castShow shadow" :style="bgColor">
            <div :style="textColor">
                <div class="text-end">
                    <button @click="() => showCast = false" :style="textColor" class="btn"><i
                            class="bi bi-x-lg"></i></button>
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
import Providers from '../src/components/helpersComponent/Providers.vue';
import { useGeneral } from '../stores/list';

const {
    API_URL,
    API_KEY,
    URL_IMG,
    GOOGLE_PROXY_URL,
    IT,
    movieGenres,
    tvGenres
} = useGeneral();

const colorThief = new ColorThief();

export default {
    components: {
        Loader,
        ActorsProfile,
        CastPreview,
        SingleMovieCard,
        Providers
    },
    data() {
        return {
            movieGenres,
            tvGenres,
            loading: null,
            isMovie: false,
            isTv: false,
            dbToSearch: null,
            title: null,
            id: null,
            itemFound: null,
            url: null,
            backdrop: null,
            backdropForColor: null,
            bgColor: null,
            textColor: null,
            cast: null,
            providers: null,
            showCast: false,
            videoKey: null,
            similar: null,
            vote: [],
            changedBackground: false,
            bodyColor: '#202020',
            imgURL: null,
            seasonsCount: null,
            seasonSelected: 1,
            episodesDetails: null,
            episodeSelectedID: null,
            onAir: null
        }
    },
    methods: {
        getCastInfo() {
            const query = API_URL + this.dbToSearch + this.id + '/credits' + API_KEY + IT;
            axios.get(query).then(res => { this.cast = res.data.cast });
        },
        getBackdropColor() {
            const img = new Image();
            let imageURL = this.backdropForColor;
            img.crossOrigin = 'Anonymous';
            img.src = GOOGLE_PROXY_URL + encodeURIComponent(imageURL);
            
            setTimeout(() => {
                try {
                    const r = colorThief.getColor(img)[0];
                    const g = colorThief.getColor(img)[1];
                    const b = colorThief.getColor(img)[2];

                    this.bgColor = `background: linear-gradient(rgb(${r}, ${g}, ${b}) 80%, rgb(${r}, ${g}, ${b}) 80%);`;
                    this.textColor = `color: rgb(${4*r+50},${4*g+50},${4*b+50});`;
                    if (r>200 && g>200 && b>200){
                        this.textColor = `color: black;`;
                    }
                    if (r<50 && g<50 && b<50){
                        this.textColor = `color: white;`;
                    }
                    this.bodyColor = `linear-gradient(rgb(${r}, ${g}, ${b}) 80%, rgb(${r}, ${g}, ${b}) 80%)`;
                    this.changedBackground = true;
                    this.loading = false;
                } catch (error) {
                    this.bgColor = `background: linear-gradient(black, #303030)`;
                    this.bodyColor = `#202020`;
                    this.textColor = 'color: white'
                    this.loading = false;
                }

                
            }, 700)
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
        getProviders(){
            const availableProviders = API_URL + this.dbToSearch + this.id + '/watch/providers' + API_KEY;

            axios.get(availableProviders)
            .then(res => {
                this.providers = res.data.results.IT;   
            }).catch(() => {
                this.providers = null;
            });
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
        },
        getSeasonData(tvID, number){
            this.seasonSelected = number;
            const query = API_URL + this.dbToSearch + tvID + '/season/' + number + API_KEY + IT;
            axios.get(query).then(res => {
                this.episodesDetails = res.data;
            }).catch(() => {
                this.episodesDetails = null;
            })

        },
        onLoadPage() {
            this.getVote();
            this.getCastInfo();
            this.getVideos();
            this.getSimilar();
            this.getProviders();
            if (this.itemFound.seasons && (this.itemFound.seasons)){
               this.getSeasonData(this.itemFound.id, 1)
            };
            /* ALWAYS LAST METHOD TO CALL */
            this.getBackdropColor();
        },
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
    watch: {
        changedBackground(){
            document.querySelector('body').style.background = this.bodyColor;
            
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
        this.imgURL = URL_IMG;
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
                this.backdropForColor = `https://image.tmdb.org/t/p/w300${this.itemFound.backdrop_path}`
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

.bodyDiv{
    max-width: 1200px;
    margin: 0 auto;
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

.containerList {
    padding: 1rem 1.5rem;
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

.accordion-button{
   
    &:after{
        filter: invert(1) brightness(2) saturate(0);
    }
}

</style>