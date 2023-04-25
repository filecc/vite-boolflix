<template>
        <div v-if="item.poster_path" class="card">
            <img class="img-card-top rounded" :src="url" :alt="store.pathUrl">          
        </div>
</template>

<script>
import { useMovieList, useGeneral } from '../../stores/list';
const store = useMovieList();
const GENERAL = useGeneral();

export default {

    props: {
        item: Object,
        quality: String
    },
    data() {
        return {
            store,
            BASE_URL: GENERAL.URL_IMG,
            BASE_URLLOW: GENERAL.URL_IMGLOW,
            url: null
        }
    },
    mounted() {
        if (!this.item.poster_path){
            this.url = '/images/img-placeholder.svg'
        } else {
            this.quality === 'low'
            ? this.url = `${this.BASE_URLLOW}${this.item.poster_path}`
            : this.url = `${this.BASE_URL}${this.item.poster_path}`

        }
    }
}
</script>

<style lang="scss" scoped>
    .card{
        min-width: 15rem;
        max-width: 15rem;
        border: none;
       
        img{
            object-fit: cover;
        }
    }
</style>