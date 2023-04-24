<template>
    <div>
        <Transition name="bounce">
            <div class="mainContainer px-4">
                <h1>Tutte l'informazioni sull'intrattenimento che stavi cercando.</h1>
            </div>
        </Transition>

        <div class=" pt-5">
            <input v-model="searchQuery" @focusin="startSearch" @focusout="finishSearch"
                class="input-group-text text-start" type="text" placeholder="Cerca...">
        </div>
    </div>
</template>

<script>
import { useGeneral } from '../../stores/list';
const GENERAL = useGeneral();

export default {
    data() {
        return {
            searching: false,
            searchQuery: null,
            GENERAL,
        }
    },
    methods: {
        startSearch() {
            console.log('focused')
            GENERAL.setSearchingModeTrue();
        },
        finishSearch(){
            if (this.searchQuery === null || this.searchQuery === ''){
                GENERAL.setSearchingModeFalse();
            } else {
                console.log('shows result')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../src/assets/style/variables' as *;

.mainContainer {
    height: 50vh;
    display: grid;
    place-items: center;

    .timeToSearch {
        max-height: 80px;
    }
}


* {
    color: white;
}

input {
    position: relative;
    background-color: #202020;
    max-width: 350px;
    border: none;
    border-bottom: 1px solid $fg-primary;

    &:focus,
    &:focus-visible {
        outline: 1px solid $fg-primary;
    }

    .timeToSearch {
        width: 100% !important;
    }

}
</style>