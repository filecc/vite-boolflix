<template>
    <div>
        <h2 v-for="movie in store.list">
            {{ movie.original_title }}
        </h2>
        <router-link class="btn btn-primary" to="/movie/generic">Movie Generic</router-link>
        <router-link class="btn btn-primary" to="/series/generic">TV Show Generic</router-link>
    </div>
</template>

<script>
    import { useHomeList } from '../stores/list';
    const store = useHomeList();
    export default{
        data(){
            return{
                store,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>