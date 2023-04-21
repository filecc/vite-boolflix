<template>


        <div v-if="actors" class="row row-cols-2  gx-0 text-white">
            <div v-for="actor in [0,1,2,3]">
                <div v-if="actors[actor]" class="col text-center p-2">
                <router-link :to="'/actors/' + actors[actor].id + '-' + actors[actor].name">
                    <img class="img-fluid rounded-circle" :src="
                    actors[0].profile_path ?
                    store.URL_IMG + actors[actor].profile_path 
                    : '/images/img-placeholder.svg'" :alt="actors[actor].name">
                </router-link>
                <h6 class="mt-2 text-white">{{ actors[actor]?.name }}</h6>
                <small>({{ actors[actor]?.character }})</small>
            </div>
            </div>
        </div>
           
</template>

<script>
import { useMovieList } from '../../stores/list';
const store = useMovieList();
    export default {
        props:{
            actors: Object
        },
        data(){
            return {
                store, 
                BASE_URL: store.URL_IMG,
               
            }
        }
    }
</script>

<style lang="scss" scoped>
    img{
       width: 80px;
       height: 80px;
       object-fit: cover
    }
</style>