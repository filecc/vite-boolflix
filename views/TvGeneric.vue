<template>
    <div v-if="store.loading">
        <Loader />
    </div>
    <div v-else class="mainDiv" :style="bgColor">
        <div class="backdrop pt-5" :style="'background-image: url(' + backdrop + ');'">
            
            <div class="py-2 px-1 px-md-4 rounded poster mx-auto m-md-0">
                <img class="img-fluid rounded" :src="url" :alt="title">
            </div>
        </div>

        <div class="info py-2 px-3 px-md-4" :style="textColor">
            <h3 class="text-center text-md-start text-white fw-bold">{{ title }}</h3>
            <div>
                <small>
                    {{ movieFound?.overview }}
                </small>
                <!-- {{ cast }} -->
                <div @click="() => showCast = true" class="py-2 cast">
                    <small>Cast:
                     <span  v-for="actor in cast">
                        <span v-if="actor.character">
                            <span> 
                                {{ actor?.name }} 
                                (
                                    <span class="fw-bold"> {{ actor.character }}</span>
                                ), 
                            </span>
                        </span>
                    </span>
                    </small>
                </div>
            </div>
        </div>

    </div>
    <div v-if="showCast" class="castShow" :style="bgColor">
            <div :style="textColor">
                <div class="text-end">
            <button @click="() => showCast = false" :style="textColor" class="btn"><i class="bi bi-x-lg"></i></button>
          </div>
            <ActorsProfile :actors="cast"  />
            </div>
        </div>
</template>

<script>
import axios from 'axios';
import { useSeriesList } from '../stores/list';
import Loader from '../src/components/Loader.vue'
import ColorThief from 'colorthief/dist/color-thief.mjs'
import ActorsProfile from '../src/components/ActorsProfile.vue';

const store = useSeriesList();
const colorThief = new ColorThief();

export default {
    components: {
    Loader,
    ActorsProfile
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
            showCast: false
        }
    },
    methods: {
        loading() {
            this.store.loadingTrue();
        },
        loadingFalse() {
            this.store.loadingFalse();
        },
        getCastInfo(id){
            const query = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=c60495b897d3871eb954459412ca5d5d&language=it-IT`;
            axios.get(query).then(res => {this.cast = res.data.cast});
        },

    },
    mounted() {
        this.loading();
        const split = this.$route.params.name.split('-');
        this.title = split[1];
        this.id = split[0];
        const query = 'https://api.themoviedb.org/3/tv/' + this.id + '?api_key=d18b4066572abd6df624614e95914560&language=it-IT';
        
        axios.get(query)
            .then(res => {
                this.movieFound = res.data;
                this.url = `${this.BASE_URL}${this.movieFound.poster_path}`;
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
                       
                        this.bgColor = `background: linear-gradient(rgb(${r}, ${g}, ${a}) 80%, rgb(${r+50}, ${g+50}, ${a+50}))`;
                        this.textColor = `color: rgb(${r+100}, ${g+150}, ${a+200})`;
                        console.log(this.bgColor)
                        console.log('text ' + this.textColor)
                    } catch (error) {
                        this.bgColor = `background: linear-gradient(black, black)`;
                        this.textColor = 'color: white'
                    }

                }, 500)
            });
            this.getCastInfo(split[0]);
            

    }

}
</script>

<style lang="scss" scoped>
@use '../src/assets/style/variables' as *;

.mainDiv {
    min-height: 100dvh;
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

.cast{
white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  cursor: pointer;
}

.castShow{
    padding: 2rem;
    margin: 1rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    border-radius: 10px;
    z-index: 1000;
}
</style>