<template>
    <div v-for="actor in actors">
        
            <div class="col text-center p-2">
                <img class="img-fluid" :src="
                    actor.profile_path ?
                    store.URL_IMG + actor.profile_path 
                    : '/images/img-placeholder.svg'" :alt="actor.name">
                <h6 class="mt-2 text-white">{{ actor?.name }}</h6>
                <small>({{ actor?.character }})</small>
               
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
        },
        mounted(){
            console.log(this.actors)
        }
    }
</script>

<style lang="scss" scoped>
    img{
        min-height: 242px;
        height: 242px;
        object-fit: cover
    }
</style>