<template>
    
        <div v-if="actors" class="row row-cols-2  gx-0 text-white">
            <div v-if="actors[0]" class="col text-center p-2">
                <img class="img-fluid rounded-circle" :src="
                    actors[0].profile_path ?
                    store.URL_IMG + actors[0].profile_path 
                    : '/images/img-placeholder.svg'" :alt="actors[0].name">
                <h6 class="mt-2 text-white">{{ actors[0]?.name }}</h6>
                <small>({{ actors[0]?.character }})</small>
               
            </div>
            <div v-if="actors[1]" class="col text-center p-2">
                <img class="img-fluid rounded-circle" :src="
                    actors[1].profile_path ?
                    store.URL_IMG + actors[1].profile_path 
                    : '/images/img-placeholder.svg'" :alt="actors[1].name">
                <h6 class="mt-2 text-white">{{ actors[1]?.name }}</h6>
                <small>({{ actors[1]?.character }})</small>
               
            </div>
            <div v-if="actors[2]" class="col text-center p-2">
                <img class="img-fluid rounded-circle" :src="
                    actors[2].profile_path ?
                    store.URL_IMG + actors[2].profile_path 
                    : '/images/img-placeholder.svg'" :alt="actors[2].name">
                <h6 class="mt-2 text-white">{{ actors[2]?.name }}</h6>
                <small>({{ actors[2]?.character }})</small>
               
            </div>
            <div v-if="actors[3]" class="col text-center p-2">
                <img class="img-fluid rounded-circle" :src="
                    actors[3].profile_path ?
                    store.URL_IMG + actors[3].profile_path 
                    : '/images/img-placeholder.svg'" :alt="actors[3].name">
                <h6 class="mt-2 text-white">{{ actors[3]?.name }}</h6>
                <small>({{ actors[3]?.character }})</small>
               
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