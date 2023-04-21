<template>
        <div class="card">
            <img class="img-card-top rounded" :src="url" :alt="store.pathUrl">          
        </div>
</template>

<script>
import { useMovieList } from '../../stores/list';
const store = useMovieList();

export default {

    props: {
        item: Object,
    },
    data() {
        return {
            store,
            BASE_URL: store.URL_IMG,
            url: null
        }
    },
    mounted() {
        !this.item.poster_path 
                ? this.url = '/images/img-placeholder.svg'
                : this.url = `${this.BASE_URL}${this.item.poster_path}`;
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