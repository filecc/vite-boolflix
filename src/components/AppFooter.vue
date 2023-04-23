<template>
    <footer class="px-4">
        <div class="d-flex justify-content-between align-items-center">
            <router-link to="/">
            <Navbar @click="changeBackground" />
        </router-link>
            <div class="text-end">
                <small>coded with 💚 by <a class="text-dark" href="https://www.instagram.com/filecc">filecc</a></small>
            </div>
        </div>
    </footer>
</template>

<script>
import Navbar from './Navbar.vue';

    export default {
    components: { Navbar },
    methods: {
        changeBackground(){
            document.querySelector('body').style.background = this.bodyColor;
        }
    }
}
</script>

<style lang="scss" scoped>
@use '../assets/style/variables' as *;

footer{
    display: grid;
    height: 80px;
    background: linear-gradient(to right, black, $fg-primary);
}
img{
    width: 100px;
}

</style>