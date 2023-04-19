<template>
    <div class="cont bg-dark">
        
        <div class="text-center text-primary">
            <p>Ooops. Sembra che questa pagina non esista.</p>
            <router-link class="btn btn-primary" to="/">Go Home</router-link>
        </div>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.cont{
    width: 100%;
    height: 100dvh;
    display: grid;
    place-items: center;
}
</style>