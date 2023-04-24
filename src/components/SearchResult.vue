<template>
    <h5 class="pt-3" v-if="result">{{ type === 'movie' ? 'Film' : 'Serie' }} per la tua ricerca</h5>
        <div v-if="result && !loadingState" class="containerResults row row-cols-2 row-cols-md-4 row-cols-lg-5">
            <template v-for="item in result" :key="item.id">
                <div v-if="item.poster_path" class="col p-2">
                    <router-link :to="'/' + type + '/' + item.id + '-' + (type === 'movie' ? item.title : item.name)">
                        <div class="card">
                            <img class="img-card-top rounded img-fluid"
                                :src="item.poster_path ? `${GENERAL.URL_IMG}${item.poster_path}` : 'images/img-placeholder.svg'"
                                :alt="item.title">
                        </div>
                    </router-link>
                </div>
            </template>
            <p v-if="result.length === 0">Nessun risultato trovato.</p>
        </div>
</template>

<script>
import { useGeneral } from '../../stores/list';
const GENERAL = useGeneral();

    export default {
        props: ['result', 'loadingState', 'type'],
        data(){
            return {
                GENERAL,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>