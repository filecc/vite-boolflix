<template>
    <h6>Disponibile su</h6>
    <small v-if="providers?.flatrate" class="d-inline-block mb-2">Streaming</small>
    <div v-if="providers?.flatrate"
        class="d-flex flex-wrap  justify-content-center justify-content-md-start align-items-center gap-2 mb-3">
        <div v-for="service in providers?.flatrate">
            <a target="_blank" :href="'https://www.google.com/search?q=' + title + ':site=' + service.provider_name">
                <img class="providersImg" :src="URL_IMG + service.logo_path" :alt="service.provider_name">
            </a>

        </div>
    </div>
    <small class="d-inline-block mb-2" v-if="providers?.buy">Acquista</small>
    <div v-if="providers?.buy"
        class="d-flex flex-wrap justify-content-center justify-content-md-start align-items-center gap-2 mb-3">
        <div v-for="service in providers?.buy">
            <a target="_blank" :href="'https://www.google.com/search?q=' + title + ':site=' + service.provider_name">
                <img class="providersImg" :src="URL_IMG + service.logo_path" :alt="service.provider_name">
            </a>
        </div>
    </div>
</template>

<script>
import { useGeneral } from '../../../stores/list';
const {URL_IMG} = useGeneral();

export default {
    props: {
        providers: Object,
        title: String
    },
    data(){
        return {
            URL_IMG,
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 8px;
}
</style>