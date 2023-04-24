<template>
    <div v-for="actor in actors">

        <div class="col text-center p-2 h-100 d-flex flex-column justify-content-between">

            <img class="img-fluid" :src="
                actor?.profile_path ?
                    store.URL_IMG + actor?.profile_path
                    : '/images/img-placeholder.svg'" :alt="actor?.name">
            <h6 class="mt-2">{{ actor?.name }}</h6>
            <small>({{ actor?.character }})</small>
            <router-link class="d-block" :to="'/actors/' + actor?.id + '-' + actor?.name">
                <button class="btn btn-sm btn-secondary">Dettagli <i class="bi bi-box-arrow-up-right"></i></button>
            </router-link>
        </div>

    </div>
</template>

<script>
import { useMovieList } from '../../stores/list';
const store = useMovieList();
export default {
    props: {
        actors: Object
    },
    data() {
        return {
            store,
            BASE_URL: store.URL_IMG,
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
img {
    min-height: 242px;
    height: 242px;
    object-fit: cover
}
</style>