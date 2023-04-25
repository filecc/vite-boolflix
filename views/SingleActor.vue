<template>
    <div v-if="loading">
        <Loader />
    </div>
    <div v-else class="text-white pt-5 px-4 mainContainer">
        <div class="row row-cols-1 row-cols-md-2 mt-4">
            <div class="col p-2 d-flex align-items-center justify-content-center">
                <img style="max-width: 20rem;" class="img-fluid" :src="
                    actor?.profile_path ?
                        URL_IMG + actor?.profile_path
                        : '/images/img-placeholder.svg'" :alt="actor?.name">
            </div>
            <div class="col">
                <h2 class="mt-2 text-white">{{ actor?.name }}</h2>
                <p v-if="actor.birthday">Data di nascita: {{
                    actor.birthday.split('-')[2] + '-' +
                    actor.birthday.split('-')[1] + '-' +
                    actor.birthday.split('-')[0]
                }} <span v-if="!actor.deathday">{{ ` (${parseInt(todayYear) - parseInt(actor.birthday.split('-')[0])}
                        anni)`}}</span></p>
                <p v-if="actor.deathday">Data di morte: {{
                    actor.deathday.split('-')[2] + '-' +
                    actor.deathday.split('-')[1] + '-' +
                    actor.deathday.split('-')[0] + ` (${parseInt(actor.deathday) - parseInt(actor.birthday)} anni)`
                }}</p>
                <p v-if="actor.place_of_birth">{{ actor.place_of_birth }}</p>

                <a v-if="actor.imdb_id" target="_blank" :href="'https://www.imdb.com/name/' + actor.imdb_id">
                    <img src="/images/imdb.svg" alt="imdb link">
                </a>

                <div v-if="actor.biography">
                    <h6 class="pt-3">Biografia</h6>
                    <p>{{ actor.biography }}</p>
                </div>

            </div>

        </div>
        <div class="mt-3" v-if="otherPhotos" >
            <h6 class="py-2">Galleria di immagini</h6>
            <div class="d-flex justify-content-center flex-wrap gap-2">
                <img v-for="photo in otherPhotos" :src="URL_IMG + photo.file_path" :alt="actor?.name">
            </div>
        </div>

        <h6 v-if="moviesAndTv" class="py-2 mt-2">Ha recitato in:</h6>
        <div ref="photosContainer" v-if="moviesAndTv" class="containerList mb-3">
            <router-link v-for="item in moviesAndTv" @wheel.stop="e => scroll(e, 'photosContainer')"
                            :to="'/' + item.media_type + '/' + item.id + '-' + (item.title || item.name)">
                <SingleMovieCard  :item="item"/>
            </router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useGeneral } from '../stores/list';
import Loader from '../src/components/Loader.vue';
import ActorsProfile from '../src/components/ActorsProfile.vue';
import SingleMovieCard from '../src/components/SingleMovieCard.vue';
const {
    API_URL,
    API_KEY,
    URL_IMG,
    GOOGLE_PROXY_URL,
    IT,
    loading
} = useGeneral();

export default {
    data() {
        return {
            URL_IMG,
            actorID: null,
            actor: null,
            loading: true,
            todayYear: new Date().getFullYear(),
            otherPhotos: null,
            divPhotosWidth: null,
            moviesAndTv: null,
        };
    },
    methods: {
        getActorDetail() {
            const query = API_URL + "person/" + this.actorID + API_KEY + IT;
            axios.get(query)
                .then(res => {
                    this.actor = res.data;
                    this.getOtherPhotos();
                    this.getMovieAndTv();
                }).catch(() => {
                    window.location.href = '/404';
                });
        },
        getOtherPhotos(){
            'https://api.themoviedb.org/3/person/73457/images?api_key=d18b4066572abd6df624614e95914560'
            const query = API_URL + "person/" + this.actorID + '/images' + API_KEY + IT;
            
          
            axios.get(query).then(res => { 
                if (res.data.profiles.length > 0){
                    this.otherPhotos = res.data.profiles;
                }
            }).catch(() => {
                this.otherPhotos = null;
            })
        },
        getMovieAndTv(){
            const query =  API_URL + "person/" + this.actorID + '/combined_credits' + API_KEY + '&language=en-US';
            axios.get(query).then(res => {
                if (res.data.cast.length > 0){
                    this.moviesAndTv = res.data.cast;
                    this.loading = false;
                }
            }).catch(() => {
                this.moviesAndTv = null;
                this.loading = false;
            })
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
    mounted() {
       
        this.loading = true;
        const paramsFromUrl = this.$route.params.name.split("-");
        const actorID = paramsFromUrl[0];
        this.actorID = actorID;
        this.getActorDetail();
        
      
    },
    components: { Loader, ActorsProfile, SingleMovieCard }
}
</script>

<style lang="scss" scoped>
img {
    max-width: 8rem;
    border-radius: 8px;
}

.mainContainer {
    min-height: calc(100dvh - 80px);
    max-width: 1200px;
    margin: 0 auto;
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

</style>